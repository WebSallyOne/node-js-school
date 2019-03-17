import * as Router from 'koa-router';
import controller = require('../controller');
import { userRouter } from './users';
import * as bodyParser from 'koa-bodyparser';

const router = new Router();

// Enable bodyParser with default options
router.use(bodyParser());

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);
router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.post('/service', controller.service.createService);

const mediaRouter = new Router();
mediaRouter.post('/service/:sid/execute', controller.service.executeService);

export { router, mediaRouter };
