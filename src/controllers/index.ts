import { AuthController } from '../controllers/authController';
import { AdminController } from './adminController';
import { responseUtil, tokenUtil, passwordUtil } from '../utils';
import { adminService } from '../database/services';

export const authController = new AuthController(tokenUtil, responseUtil);

export const adminController = new AdminController(
  tokenUtil,
  passwordUtil,
  responseUtil,
  adminService,
);
