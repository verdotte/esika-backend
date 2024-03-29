import { getConnection } from 'typeorm';
import { CreatePropertyDto } from '../../dtos/createPropertyDto';
import { Property } from '../entity/Property';
import { Image } from '../entity/Image';
import {
  findAllQuery,
  getUnverifiedQuery,
  findAllByCategoryQuery,
  findAllByUserQuery,
  findOneQuery,
} from '../query/propertyQuery';
import { IProperty } from '../../interfaces/requestWithProperty.interface';

/**
 * Property Service
 */
export class PropertyService {
  /**
   * Create
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Property} propertyData
   * @returns {Property} property payload
   * @memberof PropertyService
   */
  create = async (
    propertyData: Omit<CreatePropertyDto, 'image'> & { user: number },
  ): Promise<Property> => {
    return await Property.create(propertyData).save();
  };

  /**
   * Bulk Create Image
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Image} imageData
   * @returns {any}
   * @memberof PropertyService
   */
  bulkCreateImage = async (
    imageData: { property: number; url: string }[],
  ): Promise<any> => {
    return await Image.insert(imageData);
  };

  /**
   * Find All
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} page
   * @param {number} pageSize
   * @returns {Array[IProperty]}
   * @memberof PropertyService
   */
  findAll = async (page: number, pageSize: number): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      findAllQuery(page, pageSize),
    );

    return properties;
  };

  /**
   * Find All Unverified
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} page
   * @param {number} pageSize
   * @returns {Array[IProperty]}
   * @memberof PropertyService
   */
  findAllUnverified = async (
    page: number,
    pageSize: number,
  ): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      getUnverifiedQuery(page, pageSize),
    );
    return properties;
  };

  /**
   * Find All By Category
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {number} category
   * @param {number} page
   * @param {number} pageSize
   * @returns {Array[IProperty]}
   * @memberof PropertyService
   */
  findAllByCategory = async (
    category: number,
    page: number,
    pageSize: number,
  ): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      findAllByCategoryQuery(category, page, pageSize),
    );

    return properties;
  };

  /**
   * Find All by user
   * @author Desire Kaleba
   * @since 0.001
   *
   * @param {userId} userId
   * @param {number} page
   * @param {number} pageSize
   * @returns {Array[IProperty]}
   * @memberof PropertyService
   */
  findAllByUser = async (
    userId: number,
    page: number,
    pageSize: number,
  ): Promise<IProperty[]> => {
    const properties = await getConnection().manager.query(
      findAllByUserQuery(userId, page, pageSize),
    );

    return properties;
  };

  /**
   * Find One
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {slug} string
   * @returns {Array[IProperty]}
   * @memberof PropertyService
   */
  findOne = async (slug: string): Promise<IProperty[]> => {
    const property = await getConnection().manager.query(findOneQuery(slug));
    return property;
  };

  /**
   * get By Slug
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {slug} string
   * @returns {Property | undefined}
   * @memberof PropertyService
   */
  getBySlug = async (slug: string): Promise<Property | undefined> => {
    return await Property.findOne({ slug, active: true });
  };
}
