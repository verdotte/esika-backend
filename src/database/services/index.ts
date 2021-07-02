export * from './userService';
export * from './adminService';

import { UserService } from './userService';
import { AdminService } from './adminService';

export const userService = new UserService();
export const adminService = new AdminService();
