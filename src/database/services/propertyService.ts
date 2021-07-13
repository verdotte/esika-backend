import { CreatePropertyDto } from '../../dtos/createPropertyDto';
import { Property } from '../entity/Property';
import { Image } from '../entity/Image';

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
   * @param {Property} propertyData
   * @returns {unknown}
   * @memberof PropertyService
   */
  bulkCreateImage = async (
    imageData: { property: number; url: string }[],
  ): Promise<unknown> => {
    return await Image.insert(imageData);
  };
}
