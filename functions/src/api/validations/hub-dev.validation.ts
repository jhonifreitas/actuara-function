import * as yup from 'yup';

export const CnpjValidation = yup.object().shape({
  cnpj: yup.string().required()
});