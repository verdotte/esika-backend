import { Category } from '../entity/Category';

/**
 * Category Service
 */
export class CategoryService {

  /**
   * Find All
   * @author Dan Mugsio
   * @since 0.001
   *
   * @returns {Array[unknown]}
   * @memberof CategoryService
   */

  findAll = async (): Promise<unknown[]> => {
    const category = await Category.find();
    return category;
  };
}
