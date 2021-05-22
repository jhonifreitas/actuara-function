import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import {
  StoreValidation,
  UpdateValidation,
  DeleteValidation
} from '../validations/company.validation';
import AuthError from '../../exceptions/authentication-error';
import ValidationError from '../../exceptions/validation-error';

import { Company } from '../../models/company';
import { AuthRole } from '../../enums/auth.enum';
import CompanyRepository from '../../repositories/company.repository';

const fireAuth = admin.auth();

class CompanyController {
  async store(request: Request, response: Response) {
    const body = request.body;

    await StoreValidation.validate(body).catch(err => {
      throw new ValidationError(err.errors[0]);
    });

    const company = new Company();
    company.name = body.name;
    company.phone = body.phone;
    company.email = body.email;
    company.partner = body.partner;

    if (body.address) company.address = body.address;

    const data: admin.auth.CreateRequest = {
      email: company.email,
      displayName: company.name,
      password: body.password
    }

    if (body.image) company.image = data.photoURL = body.image;

    return await fireAuth.createUser(data).then(async userRecord => {
      const uid = userRecord.uid;
      company.id = uid;
      
      await fireAuth.setCustomUserClaims(uid, {role: AuthRole.COMMON});
      await CompanyRepository.set(company);
  
      return response.json({
        success: true,
        company: {id: uid}
      });
    }).catch(err => {
      throw new AuthError(err.message, err.code);
    });
  }

  async update(request: Request, response: Response) {
    const body = request.body;
    const { id } = request.params;

    await UpdateValidation.validate({ ...body, id }).catch(err => {
      throw new ValidationError(err.errors[0]);
    });

    const company = await CompanyRepository.getById(id);

    if (company.name !== body.name || company.email !== body.email) {
      const data: admin.auth.UpdateRequest = {};

      if (body.name && company.name !== body.name) {
        data.displayName = body.name;
      } if (body.email && company.email !== body.email) {
        data.email = body.email;
      }

      if (Object.keys(data).length) {
        await fireAuth.updateUser(id, data).catch(err => {
          throw new AuthError(err.message, err.code);
        });
      }
    }

    company.partner = body.partner;
    if (body.name) company.name = body.name;
    if (body.image) company.image = body.image;
    if (body.phone) company.phone = body.phone;
    if (body.email) company.email = body.email;
    if (body.address) company.address = body.address;

    await CompanyRepository.update(id, company);

    return response.json({
      success: true
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    
    await DeleteValidation.validate({ id }).catch(err => {
      throw new ValidationError(err.errors[0]);
    });

    await CompanyRepository.delete(id);

    return response.json({
      success: true
    });
  }
}

export default new CompanyController();
