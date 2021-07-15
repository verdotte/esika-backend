import { Request } from 'express';
import { Admin } from '../database/entity/Admin';

export interface IRequestWithAdmin extends Request {
  currentAdmin: Admin;
}