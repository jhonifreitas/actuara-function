import { Request, Response } from 'express';
import AppError from '../../exceptions/app-error';
import ValidationError from '../../exceptions/validation-error';

import hubDevService from '../services/hub-dev.service';
import { CnpjValidation } from '../validations/hub-dev.validation';

class HubDevController {

  async getCnpj(request: Request, response: Response) {
    const query = request.query as any;

    await CnpjValidation.validate(query).catch(err => {
      throw new ValidationError(err.errors[0]);
    });

    const result = await hubDevService.cnpj(query.cnpj);
    if (!result) throw new AppError('Nenhuma empresa encontrada!', 'hub-dev/cnpj-not-found');

    return response.json({
      success: true,
      result
    });
  }
}

export default new HubDevController();
