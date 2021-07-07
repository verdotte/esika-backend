import { Request } from 'express';
import { User } from '../database/entity/User';

export interface IRequestWithUser extends Request {
  currentUser: User;
}
