import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validatorHandler } from '../middlewares/validatorHandler';
import { PropertyType, Unit } from '../database/entity/Property';

const createProperty = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    title: Joi.string().trim().min(2).required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    lat: Joi.number(),
    lng: Joi.number(),
    category: Joi.number().required(),
    city: Joi.number().required(),
    type: Joi.string().trim().valid(PropertyType.RENT, PropertyType.SELL),
    unit: Joi.string().trim().valid(Unit.DAY, Unit.MONTH, Unit.YEAR),
    bedroom: Joi.number(),
    bathroom: Joi.boolean(),
    squareFeet: Joi.string(),
    parking: Joi.boolean(),
    balcony: Joi.boolean(),
    image: Joi.array().items(Joi.string()).required(),
  });

  validatorHandler(req, res, schema, next);
};

export const propertyValidator = { createProperty };
