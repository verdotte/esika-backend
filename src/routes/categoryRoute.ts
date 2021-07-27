import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import { CategoryController } from '../controllers/categoryController';
import { asyncHandler } from '../middlewares';

export class CategoryRoute implements IRoute {
  public path = '/category';
  public router = Router();

  constructor(private readonly categoryController: CategoryController) {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router
      .route(`${this.path}`)
      .get(
        asyncHandler(this.categoryController.getAllCategories),
      );
  }
}