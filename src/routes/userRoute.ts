import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { UserController } from '../controllers/userController';
import { asyncHandler, checkAuthUser } from '../middlewares';

export class UserRoute implements IRoute {
  public path = '/user';
  public router = Router();

  constructor(private readonly UserController: UserController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/profile`)
      .get(
        asyncHandler(checkAuthUser),
        asyncHandler(this.UserController.getProfile),
      );
  }
}
