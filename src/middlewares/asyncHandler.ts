import { Request, Response, NextFunction } from 'express';
import { responseUtil } from '../utils';
import { SERVER_ERROR } from '../constants/statusCodes';

export const asyncHandler = (cb: any) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    return responseUtil.error({
      statusCode: SERVER_ERROR,
      message: err.message,
      res,
    });
  }
  return true;
};
