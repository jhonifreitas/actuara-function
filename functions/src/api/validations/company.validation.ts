import * as yup from 'yup';

export const StoreValidation = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  phone: yup.string().required(),
  partner: yup.boolean().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .min(8, 'The password must at least 8 characters.')
    .matches(/[0-9]/, 'The password must contain numbers.')
    .matches(/[a-zA-Z]/, 'The password must contain letters.')
    .matches(/[!@#$%&*()_=+;:,.?><\-]/, 'The password must contain special character.')
    .required(),
});

export const UpdateValidation = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().email().nullable()
});

export const DeleteValidation = yup.object().shape({
  id: yup.string().required()
});
