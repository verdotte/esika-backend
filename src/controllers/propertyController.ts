import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { OK } from '../constants/statusCodes';
import { created } from '../constants/responseMessages';
import { CreatePropertyDto } from '../dtos/createPropertyDto';
import { PropertyService } from '../database/services';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';

/**
 * Property Controller
 */
export class PropertyController {
  /**
   * @constructor
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {ResponseUtil} responseUtil
   * @param {PropertyService} propertyService
   */
  constructor(
    private responseUtil: ResponseUtil,
    private propertyService: PropertyService,
  ) {}

  /**
   * Create Property
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} property payload
   * @memberof PropertyController
   */
  createProperty = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { userId } = req.currentUser;
    const {
      title,
      description,
      price,
      location,
      category,
      city,
      type,
      unit,
      bedroom,
      bathroom,
      squareFeet,
      parking,
      balcony,
      image,
    }: CreatePropertyDto = req.body;

    const property = await this.propertyService.create({
      title,
      description,
      price,
      location,
      category,
      user: userId,
      city,
      type,
      unit,
      bedroom,
      bathroom,
      squareFeet,
      parking,
      balcony,
    });

    await this.savePropertyImage(image, property.propertyId);

    return this.responseUtil.success({
      statusCode: OK,
      message: created('property'),
      data: { property },
      res,
    });
  };

  /**
   * Save PropertyImage
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Array[string]} image
   * @param {number} propertyId
   * @returns {void}
   * @memberof PropertyController
   */
  private savePropertyImage = async (
    image: string[],
    propertyId: number,
  ): Promise<void> => {
    const propertyImageData = image.map((url) => {
      return {
        property: propertyId,
        url,
      };
    });

    await this.propertyService.bulkCreateImage(propertyImageData);
  };
}
