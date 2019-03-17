import { BaseContext } from 'koa';
import { promisify } from 'util';
import { getManager, Repository } from 'typeorm';
import { Service } from '../entity/service';
import { Stream } from '../entity/stream';
import status = require('http-status');
import { allowerTransforms } from './../utilities/transforms';
import { pipeline, Transform } from 'stream';

export default class ServiceController {

    public static async createService(ctx: BaseContext) {
        const passedTransforms: string[] = ctx.body.flowSteps;

        if (passedTransforms.some(stream => !allowerTransforms.hasOwnProperty(stream))) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = `You passed wrong transforms! Allowed transforms: ${Object.keys(allowerTransforms)}`;
            return;
        }

        const serviceRepository: Repository<Service> = getManager().getRepository(Service);

        const createdStreams: Stream[] = passedTransforms.map((transform, index) => {
            const streamToBeSaved = new Stream();
            streamToBeSaved.action = transform;
            streamToBeSaved.queuePosition = index + 1;
            return streamToBeSaved;
        });

        const newService = new Service();
        newService.streams = createdStreams;

        const savedService = await serviceRepository.save(newService);

        ctx.status = status.CREATED;
        ctx.body = savedService;
    }

    public static async executeService(ctx: BaseContext) {
        const serviceRepository: Repository<Service> = getManager().getRepository(Service);

        const service: Service = await serviceRepository.findOne({
            relations: ['streams'],
            where: {
                id: +ctx.params.sid
            }
        });

        const promisifiedPipeline = promisify(pipeline);

        const streamActions: Transform[] = service.streams
            .sort((a, b) => a.queuePosition - b.queuePosition)
            .map(stream => allowerTransforms[stream.action]);

        ctx.body = await promisifiedPipeline([
            ctx.req,
            ...streamActions,
            ctx.res
        ]);

        ctx.status = status.OK;
    }
}
