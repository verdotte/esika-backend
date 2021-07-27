import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { PropertyController } from '../controllers/propertyController';
import { asyncHandler, checkAuthUser, checkAdminAuth } from '../middlewares';
import { propertyValidator } from '../validators/propertyValidator';

export class PropertyRoute implements IRoute {
  public path = '/property';
  public router = Router();

  constructor(private readonly propertyController: PropertyController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .post(
        asyncHandler(checkAuthUser),
        propertyValidator.createProperty,
        asyncHandler(this.propertyController.createProperty),
      )
      .get(asyncHandler(this.propertyController.getAllProperty));

    this.router
      .route(`${this.path}/unverified`)
      .get(
        asyncHandler(checkAdminAuth),
        asyncHandler(this.propertyController.getUnverifiedProperty),
      );
    this.router
      .route(`${this.path}/:category`)
      .get(
        asyncHandler(this.propertyController.getByCategory),
      );
    this.router
      .route(`${this.path}/:userId/getAllByUser`)
      .get(
        asyncHandler(this.propertyController.getAllByUser),
      );
  }
}
