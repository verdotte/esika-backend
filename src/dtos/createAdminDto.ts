import { AdminRole } from '../database/entity/Admin';
export interface CreateAdminDto {
  username: string;
  password: string;
  phoneNumber: string;
  role: AdminRole;
}
