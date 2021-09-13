import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { UserController } from '../controllers/userController';
import { asyncHandler, checkAuthUser, checkProfile } from '../middlewares';
import { userValidator } from '../validators/userValidator';

export class UserRoute implements IRoute {
  public path = '/user';
  public router = Router();

  constructor(private readonly userController: UserController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/profile`)
      .get(
        asyncHandler(checkAuthUser),
        asyncHandler(this.userController.getCurrentProfile),
      );
    this.router
      .route(`${this.path}/agent`)
      .get(asyncHandler(this.userController.getAllAgent));
    this.router
      .route(`${this.path}/profile/:userId`)
      .put(
        asyncHandler(checkAuthUser),
        asyncHandler(checkProfile),
        userValidator.updateUserInfo,
        asyncHandler(this.userController.editProfile),
      )
      .get(
        asyncHandler(checkProfile),
        asyncHandler(this.userController.getProfile),
      );
    this.router
      .route(`${this.path}/deactivate/:userId`)
      .put(
        asyncHandler(checkAuthUser),
        asyncHandler(checkProfile),
        asyncHandler(this.userController.deactivateUser),
      );
  }
}
