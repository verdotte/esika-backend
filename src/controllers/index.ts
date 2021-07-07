import { AuthController } from './authController';
import { AdminController } from './adminController';
import { UserController } from './userController';
import { responseUtil, tokenUtil, passwordUtil } from '../utils';
import { adminService, userService } from '../database/services';
import { twilioService } from '../plugins/twilo';

export const authController = new AuthController(
  tokenUtil,
  responseUtil,
  twilioService,
  userService,
);

export const adminController = new AdminController(
  tokenUtil,
  passwordUtil,
  responseUtil,
  adminService,
);

export const userController = new UserController(responseUtil, userService);
