import { AdminRole } from '../database/entity/Admin';
import { CreateAdminDto } from '../dtos/createAdminDto';
import { LoginAdminDto } from '../dtos/loginAdminDto';

export const adminData: CreateAdminDto = {
  username: 'Jololo',
  password: 'lalax$123',
  phoneNumber: '0788823129',
  role: AdminRole.ADMIN,
};
export const adminLoginData: LoginAdminDto = {
  username: 'Jololo',
  password: 'lalax$123',
};
export const adminLoginFailUsernameData: LoginAdminDto = {
  username: 'Joolo',
  password: 'lalax$123',
};
export const adminLoginFailPasswordData: LoginAdminDto = {
  username: 'Jololo',
  password: 'lalax$12',
};
