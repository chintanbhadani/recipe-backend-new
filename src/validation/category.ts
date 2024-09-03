import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { requiredInteger, requiredString, schemaOptions, validateString } from './constant';

export const validateAddCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            title: requiredString.label('Title'),
            description: requiredString.label('description'),
            parentId: Joi.number().optional().label('Parent Category ID')
        });

        const { error } = schema.validate(req.body, schemaOptions);

        if (error) {
            throw error.message;
        }

        next();
    } catch (error) {
        return res.sendError(error, 'validateAddCategory');
    }
};

export const validateCategoryIdInParams = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            categoryId: requiredInteger,
        });

        const { error } = schema.validate(req.params, schemaOptions);

        if (error) {
            throw error.message;
        }

        next();
    } catch (error) {
        return res.sendError(error, 'validateCategoryIdInParams');
    }
};

export const validateUpdateCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            categoryId: requiredInteger,
            title: validateString.label('Title'),
            description: validateString.label('description'),
        });

        const { error } = schema.validate(req.body, schemaOptions);

        if (error) {
            throw error.message;
        }

        next();
    } catch (error) {
        return res.sendError(error, 'validateUpdateCategory');
    }
};