import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AdminController } from '../controllers/adminController';
import { asyncHandler, checkUsername } from '../middlewares';
import { adminValidator } from '../validators/adminValidator';
import { checkAdminAuth } from '../middlewares/checkAdminAuth';
import { checkUserIsAdmin } from '../middlewares/checkUserIsAdmin';

export class AdminRoute implements IRoute {
  public path = '/admin';
  public router = Router();

  constructor(private readonly adminController: AdminController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/signup`)
      .post(
        adminValidator.signup,
        asyncHandler(checkUsername),
        asyncHandler(this.adminController.createAdmin),
      );

    this.router
      .route(`${this.path}/login`)
      .post(
        adminValidator.login,
        asyncHandler(this.adminController.login)
      );

    this.router
      .route(`${this.path}/profile`)
      .get(
        asyncHandler(checkAdminAuth),
        asyncHandler(this.adminController.getAdminProfile),
      );

    this.router
      .route(`${this.path}/add-manager`)
      .post(
        adminValidator.signup,
        asyncHandler(checkUsername),
        asyncHandler(checkUserIsAdmin),
        asyncHandler(this.adminController.createManager),
      );
  }
}
