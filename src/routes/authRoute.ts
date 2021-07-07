import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/authController';
import { asyncHandler, checkUserPhoneNumber } from '../middlewares';
import { userValidator } from '../validators/userValidator';

export class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();

  constructor(private readonly authController: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/signup`)
      .post(
        userValidator.signup,
        asyncHandler(checkUserPhoneNumber),
        asyncHandler(this.authController.signup),
      );
    this.router
      .route(`${this.path}/verify`)
      .post(
        userValidator.verifyUser,
        asyncHandler(this.authController.verifyUserAccount),
      );
    this.router
      .route(`${this.path}/login`)
      .post(userValidator.login, asyncHandler(this.authController.login));

    this.router
      .route(`${this.path}/resend`)
      .post(
        userValidator.login,
        asyncHandler(this.authController.resendVerificationCode),
      );
  }
}
