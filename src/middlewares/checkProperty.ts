import { Response, NextFunction } from 'express';
import { propertyService } from '../database/services';
import { responseUtil } from '../utils';
import { NOT_FOUND } from '../constants/statusCodes';
import { notExist } from '../constants/responseMessages';
import { IRequestWithProperty } from '../interfaces/requestWithProperty.interface';

export const checkProperty = async (
  req: IRequestWithProperty,
  res: Response,
  next: NextFunction,
) => {
  const { slug } = req.params;
  const foundProperty = await propertyService.getBySlug(slug);

  if (!foundProperty) {
    return responseUtil.error({
      statusCode: NOT_FOUND,
      message: notExist('property'),
      res,
    });
  }

  req.property = foundProperty;

  next();
};
