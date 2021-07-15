import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { adminService } from '../database/services';
import { responseUtil } from '../utils';
import { UNAUTHORIZED } from '../constants/statusCodes';
import { IRequestWithAdmin } from '../interfaces/requestWithAdmin.interface';

const { JWT_SECRET_KEY } = process.env;

export const checkAdminAuth = async (
  req: IRequestWithAdmin,
  res: Response,
  next: NextFunction,
) => {
  const { authorization = '' } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    console.log("token");
    return responseUtil.error({
      statusCode: UNAUTHORIZED,
      message: `Unauthorized access for admin`,
      res,
    });
  }

  jwt.verify(token, `${JWT_SECRET_KEY}`, async (err, decoded: any) => {
    if (err || !decoded) {
      return responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for admin`,
        res,
      });
    }

    const { id }: { id: number } = decoded;

    const admin = await adminService.findById(id);
    if (admin === null) {
      return responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for admin`,
        res,
      });
    }

    req.currentAdmin = admin;
    next();
  });
};