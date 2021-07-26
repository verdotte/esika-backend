import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { CategoryService } from '../database/services/categoryService';
import { OK } from '../constants/statusCodes';

/**
 * Category Controller
 */
export class CategoryController {
  /**
   * @constructor
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {ResponseUtil} responseUtil
   * @param {CategoryService} CategoryService
   */
  constructor(
    private responseUtil: ResponseUtil,
    private categoryService: CategoryService,
  ) {}

  /**
   * Get All
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} cities payload
   * @memberof CategoryController
   */

  getAllCategories = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const categoryList = await this.categoryService.findAll();

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { categoryList },
      res,
    });

  };

}
