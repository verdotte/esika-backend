import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { userService } from '../database/services';
import { responseUtil } from '../utils';
import { UNAUTHORIZED } from '../constants/statusCodes';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';

const { JWT_SECRET_KEY } = process.env;

export const checkAuthUser = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return responseUtil.error({
      statusCode: UNAUTHORIZED,
      message: `Unauthorized access for user`,
      res,
    });
  }

  jwt.verify(token, `${JWT_SECRET_KEY}`, async (err, decoded: any) => {
    if (err || !decoded) {
      return responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    const { id }: { id: number } = decoded;

    const user = await userService.findById(id);
    if (!user) {
      return responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    req.currentUser = user;
    next();
  });
};
