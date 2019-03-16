import * as Router from 'koa-router';
import controller = require('../controller');
import { userRouter } from './users';
import { serviceRouter } from './services';

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);
router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.use('/service', serviceRouter.routes(), userRouter.allowedMethods());

export { router };
