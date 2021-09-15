import { Router } from 'express';

import IMAController from '../controllers/ima.controller';
import { ensureAuthentication } from '../middlewares/ensure-authentication';

const imaRouter = Router();

imaRouter.use(ensureAuthentication);

imaRouter.get('/:cnpj/license', IMAController.getLicenses);

export default imaRouter;
