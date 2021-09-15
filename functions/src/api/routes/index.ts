import { Router } from 'express';

import imaRouter from './ima.route';
import userRouter from './user.route';
import hubDevRouter from './hub-dev.route';
import companyRouter from './company.route';

const routes = Router();

routes.use('/ima', imaRouter);
routes.use('/user', userRouter);
routes.use('/hub-dev', hubDevRouter);
routes.use('/company', companyRouter);

export default routes;
