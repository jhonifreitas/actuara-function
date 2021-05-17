import { Router } from 'express';

import HubDevController from '../controllers/hub-dev.controller';
import { ensureAuthentication } from '../middlewares/ensure-authentication';

const hubDevRouter = Router();

hubDevRouter.use(ensureAuthentication);

hubDevRouter.get('/cnpj', HubDevController.getCnpj);

export default hubDevRouter;
