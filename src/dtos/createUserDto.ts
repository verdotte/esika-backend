import { UserType } from '../database/entity/User';
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: UserType;
}
