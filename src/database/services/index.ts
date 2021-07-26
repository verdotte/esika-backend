export * from './userService';
export * from './adminService';
export * from './propertyService';
export * from './cityService';
export * from './categoryService';

import { UserService } from './userService';
import { AdminService } from './adminService';
import { PropertyService } from './propertyService';
import { CityService } from './cityService';
import { CategoryService } from './categoryService';

export const userService = new UserService();
export const adminService = new AdminService();
export const propertyService = new PropertyService();
export const cityService = new CityService()
export const categoryService = new CategoryService()

