import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/authController';
import { asyncHandler } from '../middlewares';
import { adminValidator } from '../validators/adminValidator';

export class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();

  constructor(private readonly authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/login`)
      .post(adminValidator.login,
        asyncHandler(this.authController.login));
  }
}
