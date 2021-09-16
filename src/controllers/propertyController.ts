import { Request, Response } from 'express';
import { EventEmitter } from 'events';
import { ResponseUtil } from '../utils';
import { NOT_FOUND, OK, UNAUTHORIZED } from '../constants/statusCodes';
import {
  created,
  deleted,
  notExist,
  updated,
} from '../constants/responseMessages';
import { CreatePropertyDto } from '../dtos/createPropertyDto';
import { PropertyService } from '../database/services';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';
import { paginator } from '../utils/paginator';
import { PAGE_LIMIT } from '../constants/shared';
import {
  IRequestWithProperty,
  IProperty,
} from '../interfaces/requestWithProperty.interface';

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
    private notifEvent: EventEmitter,
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

    this.notifEvent.emit('create-index', {
      title: property.title || property.description,
      location: property.location,
      objectID: property.slug,
      image: image[0] ?? null,
      resource: 'property',
      description: property.description,
      price: property.price,
    });

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

  /**
   * Get All Property
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} property payload
   * @memberof PropertyController
   */
  getAllProperty = async (req: Request, res: Response): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const propertyList = await this.propertyService.findAll(
      pageNumber,
      PAGE_LIMIT,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  /**
   * Get All Property
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} property payload
   * @memberof PropertyController
   */
  getUnverifiedProperty = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const propertyList = await this.propertyService.findAllUnverified(
      pageNumber,
      PAGE_LIMIT,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  /**
   * Get By Category
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} property payload
   * @memberof PropertyController
   */
  getByCategory = async (req: Request, res: Response): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const { category = 0 } = req.params;
    const categoryProperty = +category;
    const propertyList = await this.propertyService.findAllByCategory(
      categoryProperty,
      pageNumber,
      PAGE_LIMIT,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  /**
   * Get All By User
   * @author Desire Kaleba
   * @since 0.001
   *
   * @param {IRequestWithUser} req
   * @param {Response} res
   * @returns {Array{Property} properties
   * @memberof PropertyController
   */
  getAllByUser = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser } = req;
    const { page = 0 } = req.query;
    const { userId = 0 } = req.params;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const userIdProperty = +userId;

    console.log('>>>>>>', currentUser.userId, userIdProperty);

    if (currentUser.userId !== userIdProperty) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }
    const propertyList = await this.propertyService.findAllByUser(
      userIdProperty,
      pageNumber,
      PAGE_LIMIT,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: {
        propertyList:
          propertyList.length > 0
            ? this.propertyFormatter(propertyList)
            : propertyList,
        currentPage,
        pageSize: PAGE_LIMIT,
      },
      res,
    });
  };

  /**
   * Get One Property
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Response} property payload
   * @memberof PropertyController
   */
  getOneProperty = async (
    req: IRequestWithProperty,
    res: Response,
  ): Promise<Response> => {
    const { slug } = req.params;

    const property = await this.propertyService.findOne(slug);

    if (property.length === 0) {
      return this.responseUtil.error({
        statusCode: NOT_FOUND,
        message: notExist('property'),
        res,
      });
    }

    const propertyPayload = this.propertyFormatter(property)[0];

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: propertyPayload,
      res,
    });
  };

  /**
   * Update Property
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IRequestWithProperty} req
   * @param {Response} res
   * @returns {Response} property payload
   * @memberof PropertyController
   */
  updateProperty = async (
    req: IRequestWithProperty,
    res: Response,
  ): Promise<Response> => {
    const { property, body } = req;

    Object.assign(property, { ...body });
    await property.save();

    this.notifEvent.emit('update-index', {
      title: property.title || property.description,
      location: property.location,
      objectID: property.slug,
      resource: 'property',
      description: property.description,
      price: property.price,
    });

    return this.responseUtil.success({
      statusCode: OK,
      message: updated(`property`),
      data: property,
      res,
    });
  };

  /**
   * Delete Property
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IRequestWithProperty} req
   * @param {Response} res
   * @returns {Response} property payload
   * @memberof PropertyController
   */
  deleteProperty = async (
    req: IRequestWithProperty,
    res: Response,
  ): Promise<Response> => {
    const { property } = req;

    Object.assign(property, { active: false });
    await property.save();

    this.notifEvent.emit('delete-index', property.slug);

    return this.responseUtil.success({
      statusCode: OK,
      message: deleted(`property`),
      data: property,
      res,
    });
  };

  private propertyFormatter = (property: IProperty[]): any[] => {
    return property.map(
      ({
        propertyId,
        title,
        description,
        userId,
        price,
        unit,
        type,
        bedroom,
        bathroom,
        location,
        slug,
        parking,
        balcony,
        category,
        city,
        createdAt,
        firstName,
        phoneNumber,
        picture,
        image,
        area,
        categoryId,
        cityId,
        verified,
      }) => {
        return {
          propertyId,
          title,
          description,
          userId,
          price,
          unit,
          type,
          location,
          slug,
          category,
          city,
          createdAt,
          firstName,
          phoneNumber,
          picture,
          image,
          categoryId,
          cityId,
          verified,
          spec: {
            bedroom,
            bathroom,
            parking,
            balcony,
            area,
          },
        };
      },
    );
  };
}
