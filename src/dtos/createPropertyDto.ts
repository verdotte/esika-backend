import { PropertyType, Unit, Currency } from '../database/entity/Property';

export interface CreatePropertyDto {
  title: string;
  description: string;
  price: string;
  location: string;
  lat?: number;
  lng?: number;
  category: number;
  city: number;
  type: PropertyType;
  unit?: Unit;
  bedroom?: number;
  bathroom: boolean;
  squareFeet?: string;
  parking?: boolean;
  balcony?: boolean;
  image: string[];
  currency?: Currency;
}
