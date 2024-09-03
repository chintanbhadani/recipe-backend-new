import { Response as ExpressResponse } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendError: (error: unknown, funcName: string) => Response<any, ExpressResponse<string, any>>;
    }
  }
}
