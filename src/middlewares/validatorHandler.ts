import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '../constants/statusCodes';

export const validatorHandler = (
  req: Request,
  res: Response,
  schema: any,
  next: NextFunction,
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
