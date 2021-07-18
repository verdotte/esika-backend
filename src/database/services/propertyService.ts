import { getConnection } from 'typeorm';
import { CreatePropertyDto } from '../../dtos/createPropertyDto';
import { Property } from '../entity/Property';
import { Image } from '../entity/Image';
import { findAllQuery, getUnverifiedQuery } from '../query/propertyQuery';

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
   * @returns {unknown}
   * @memberof PropertyService
   */
  bulkCreateImage = async (
    imageData: { property: number; url: string }[],
  ): Promise<unknown> => {
    return await Image.insert(imageData);
  };

  /**
   * Find All
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} page
   * @param {number} pageSize
   * @returns {Array[unknown]}
   * @memberof PropertyService
   */
  findAll = async (page: number, pageSize: number): Promise<unknown[]> => {
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
   * @returns {Array[unknown]}
   * @memberof PropertyService
   */
  findAllUnverified = async (
    page: number,
    pageSize: number,
  ): Promise<unknown[]> => {
    const properties = await getConnection().manager.query(
      getUnverifiedQuery(page, pageSize),
    );
    return properties;
  };
}
