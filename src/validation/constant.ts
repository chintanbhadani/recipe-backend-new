import Joi from 'joi';

export const validateString = Joi.string();
export const requiredString = validateString.required();

export const validateEmail = validateString.email();
export const requiredEmail = validateEmail.required();

export const validateNumber = Joi.number();
export const requiredNumber = validateNumber.required();

export const validateInteger = validateNumber.integer();
export const requiredInteger = validateInteger.required();

export const schemaOptions = {
  errors: {
    wrap: {
      label: '',
    },
  },
};
