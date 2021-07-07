import { Request, Response, NextFunction } from 'express';
import { userService } from '../database/services';
import { responseUtil } from '../utils';
import { BAD_REQUEST } from '../constants/statusCodes';
import { exist } from '../constants/responseMessages';

export const checkUserPhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { phoneNumber }: { phoneNumber: string } = req.body;
  const userFound = await userService.findPhoneNumber(phoneNumber);
  if (userFound) {
    return responseUtil.error({
      statusCode: BAD_REQUEST,
      message: exist('phone number'),
      res,
    });
  }

  next();
};
