export * from './userService';
export * from './adminService';
export * from './propertyService';

import { UserService } from './userService';
import { AdminService } from './adminService';
import { PropertyService } from './propertyService';

export const userService = new UserService();
export const adminService = new AdminService();
export const propertyService = new PropertyService();
