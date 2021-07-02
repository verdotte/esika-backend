import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    username: Joi.string().trim().min(4).required(),
    role: Joi.string().trim().valid('admin', 'manager').required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().trim().required(),
  });

  validatorHandler(req, res, schema, next);
};

export const login = Joi.object().keys({
  username: Joi.string().trim().min(4).required(),
  password: Joi.string().required(),
});

export const adminValidator = { signup, login };
