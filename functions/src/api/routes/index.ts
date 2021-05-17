import { Router } from 'express';

import userRouter from './user.route';
import hubDevRouter from './hub-dev.route';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/hub-dev', hubDevRouter);

export default routes;
