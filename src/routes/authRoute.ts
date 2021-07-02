import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { AuthController } from '../controllers/authController';
import { asyncHandler } from '../middlewares';

export class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();

  constructor(private readonly auth: AuthController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(this.path).post(asyncHandler(this.auth.login));
  }
}
