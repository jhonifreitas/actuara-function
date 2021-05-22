import { Router } from 'express';

import userRouter from './user.route';
import hubDevRouter from './hub-dev.route';
import companyRouter from './company.route';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/hub-dev', hubDevRouter);
routes.use('/company', companyRouter);

export default routes;
