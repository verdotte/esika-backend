import { Request, Response, NextFunction } from 'express';
import { adminService } from '../database/services';
import { responseUtil } from '../utils';
import { BAD_REQUEST } from '../constants/statusCodes';
import { exist } from '../constants/responseMessages';

export const checkUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username }: { username: string } = req.body;
  const adminFound = await adminService.findUsername(username);

  if (adminFound) {
    return responseUtil.error({
      statusCode: BAD_REQUEST,
      message: exist('username'),
      res,
    });
  }
  next();
};
