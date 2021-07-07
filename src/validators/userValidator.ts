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

export const userValidator = { signup, login, verifyUser };
