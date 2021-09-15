import { Request, Response } from 'express';
import AppError from '../../exceptions/app-error';
import ValidationError from '../../exceptions/validation-error';

import imaService from '../services/ima.service';
import { LicenseValidation } from '../validations/ima.validation';

class IMAController {

  async getLicenses(request: Request, response: Response) {
    const { cnpj } = request.params;

    await LicenseValidation.validate({ cnpj }).catch(err => {
      throw new ValidationError(err.errors[0]);
    });

    const result = await imaService.licenses(cnpj);
    if (!result) throw new AppError('Nenhuma licença encontrada!', 'ima/licenses-not-found');

    return response.json({
      success: true,
      result
    });
  }
}

export default new IMAController();
