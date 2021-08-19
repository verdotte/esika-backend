import { Response, NextFunction } from 'express';
import { userService } from '../database/services';
import { responseUtil } from '../utils';
import { BAD_REQUEST } from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';

export const checkProfile = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const currentUserId: number = +userId;
  const userFound = await userService.findById(currentUserId);

  if (!userFound) {
    return responseUtil.error({
      statusCode: BAD_REQUEST,
      message: notExist('user'),
      res,
    });
  }

  req.userProfile = userFound;
  next();
};
