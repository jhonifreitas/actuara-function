import * as yup from 'yup';

export const LicenseValidation = yup.object().shape({
  cnpj: yup.string().required()
});