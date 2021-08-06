/***
 * HERE I AM TO CHECK IF USER ROLE IS ADMIN 
 * TO GRANT HIM MANAGER CREATION 
 */
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import { adminService } from '../database/services';
import { responseUtil } from '../utils';
import { UNAUTHORIZED } from '../constants/statusCodes';
import { IRequestWithAdmin } from '../interfaces/requestWithAdmin.interface';

const { JWT_SECRET_KEY } = process.env;

export const checkUserIsAdmin = async (
    req: IRequestWithAdmin,
    res: Response,
    next: NextFunction
) => {
    const { authorization = '' } = req.headers;
    const token = authorization.split(' ')[1];
    // check if header has token

    if (!token) {
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
        // find user by ID
        const admin = await adminService.findById(id);
        // check if user's role is admin
        const adminRole = admin?.role;
        if (admin === null && adminRole !== 'admin') {
            return responseUtil.error({
                statusCode: UNAUTHORIZED,
                message: 'Unauthorized access for none admin',
                res,
            })
        }
    });
    next();
};
