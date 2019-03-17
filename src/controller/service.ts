import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { Service } from '../entity/service';
import { Stream } from '../entity/stream';
import status = require('http-status');
import { allowerTransforms } from './../utilities/transforms';

export default class ServiceController {

    public static async createService(ctx: BaseContext) {
        const passedTransforms: string[] = ctx.request.body.flowSteps;

        if (passedTransforms.some(stream => !allowerTransforms.hasOwnProperty(stream))) {
            ctx.status = status.BAD_REQUEST;
            ctx.body = `You passed wrong transforms! Allowed transforms: ${Object.keys(allowerTransforms)}`;
            return;
        }

        const serviceToBeSaved = new Service();

        serviceToBeSaved.streams = passedTransforms.map((transform, index) => {
            const streamToBeSaved = new Stream();
            streamToBeSaved.action = transform;
            streamToBeSaved.queuePosition = index + 1;
            return streamToBeSaved;
        });

        const serviceRepository: Repository<Service> = getManager().getRepository(Service);
        const savedService = await serviceRepository.save(serviceToBeSaved);

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

        ctx.body = service.streams
            .sort((a, b) => a.queuePosition - b.queuePosition)
            .map(stream => allowerTransforms[stream.action])
            .reduce(
                (piped, transform) => piped.pipe(transform()),
                ctx.req
            );

        ctx.status = status.OK;
    }
}
