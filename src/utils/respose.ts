import { NextFunction, Request, Response } from 'express';

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZE: 401,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGE = {
  SERVER_ERROR: 'Something want wrong, Please try again later or contact admin',
  EMAIL_ALREADY: 'Email is already in use, Please choose different email',
  UNAUTHORIZE: 'Unauthorized access! Please login again',
};

export enum DEFAULT_MESSAGE_TYPE {
  CREATED = 'created',
  ADDED = 'added',
  UPDATED = 'updated',
  DELETED = 'deleted',
  GET = 'details',
  NOT_FOUND= 'not exist',
}

export const DEFAULT_MESSAGE = (messageFor: string, type: DEFAULT_MESSAGE_TYPE) => {
  return `${messageFor} ${type}`;
};

export const customError = (req: Request, res: Response, next: NextFunction) => {
  res.sendError = (error: unknown, funcName: string) => {
    let message = RESPONSE_MESSAGE.SERVER_ERROR;

    let STATUS = STATUS_CODE.SERVER_ERROR;

    if (typeof error === 'string') {
      message = error;
      STATUS = STATUS_CODE.BAD_REQUEST;
    } else {
      console.log(`Error occurs in ${funcName}: ${error}`);
    }

    return res.status(STATUS).json({
      success: false,
      message,
    });
  };

  next();
};
