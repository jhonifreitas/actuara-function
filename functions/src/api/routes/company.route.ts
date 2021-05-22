import { Router } from 'express';
import { AuthRole } from '../../enums/auth.enum';

import { ensureRole } from '../middlewares/ensure-role';
import CompanyController from '../controllers/company.controller';
import { ensureAuthentication } from '../middlewares/ensure-authentication';

const companyRouter = Router();

companyRouter.use(ensureAuthentication);

companyRouter.post('/', CompanyController.store);
companyRouter.put('/:id', CompanyController.update);
companyRouter.delete(
  '/:id',
  ensureRole([AuthRole.ADMINISTRATOR]),
  CompanyController.delete
);

export default companyRouter;
