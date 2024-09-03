import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { requiredEmail, requiredString, schemaOptions } from './constant';
import User from '../models/user';

export const validateSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      name: requiredString.label('Name'),
      email: requiredEmail
        .custom(async (value, helper) => {
          const already = await User.findOne({email: value });

          if (already) {
            return helper.message({
              custom: 'Email is already in use, Please choose different email',
            });
          }

          return true;
        })
        .label('Email'),
      password: requiredString.label('Password'),
    });

    const { error } = schema.validate(req.body, schemaOptions);

    if (error) throw error.message;

    next();
  } catch (error) {
    return res.sendError(error, 'validateSignup');
  }
};
export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      email: requiredEmail.label('Email'),
      password: requiredString.label('Password'),
    });

    const { error } = schema.validate(req.body, schemaOptions);

    if (error) throw error.message;

    next();
  } catch (error) {
    return res.sendError(error, 'validateSignup');
  }
};
