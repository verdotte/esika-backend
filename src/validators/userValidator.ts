import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';

const signup = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
    phoneNumber: Joi.string().trim().required(),
  });

  validatorHandler(req, res, schema, next);
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    phoneNumber: Joi.string().trim().required(),
  });

  validatorHandler(req, res, schema, next);
};

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    phoneNumber: Joi.string().trim().required(),
    code: Joi.string().trim().required(),
  });

  validatorHandler(req, res, schema, next);
};

const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().trim().min(2),
    lastName: Joi.string().trim().min(2),
    email: Joi.string().trim().email(),
    picture: Joi.string().trim(),
    phoneNumber: Joi.string().trim(),
    address: Joi.string().trim(),
    bio: Joi.string().trim(),
  });

  validatorHandler(req, res, schema, next);
};

export const userValidator = { signup, login, verifyUser, updateUserInfo };
