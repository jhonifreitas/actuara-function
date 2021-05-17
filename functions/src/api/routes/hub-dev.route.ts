import { Router } from 'express';

import HubDevController from '../controllers/hub-dev.controller';

const hubDevRouter = Router();

hubDevRouter.get('/cnpj', HubDevController.getCnpj);

export default hubDevRouter;
