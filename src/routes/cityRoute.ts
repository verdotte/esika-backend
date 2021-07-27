import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { CityController } from '../controllers/cityController';
import { asyncHandler } from '../middlewares';

export class CityRoute implements IRoute {
  public path = '/city';
  public router = Router();

  constructor(private readonly cityController: CityController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router
      .route(`${this.path}`)
      .get(
        asyncHandler(this.cityController.getAllCities),
      );
  }
}