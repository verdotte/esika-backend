import { Request } from 'express';
import { Unit, PropertyType, Property } from '../database/entity/Property';

export interface IProperty {
  propertyId: number;
  title: string;
  description: string;
  userId: number;
  price: string;
  unit: Unit;
  type: PropertyType;
  bedroom: number;
  bathroom: boolean;
  location: string;
  slug: string;
  parking: boolean;
  balcony: boolean;
  category: string;
  city: string;
  createdAt: Date;
  firstName: string;
  phoneNumber: string;
  picture: null;
  image: string;
}

export interface IRequestWithProperty extends Request {
  property: Property;
}
