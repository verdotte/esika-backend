import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { CityService } from '../database/services/cityService';
import { OK } from '../constants/statusCodes';

import { IRequestWithAdmin } from '../interfaces/requestWithAdmin.interface';

/**
 * City Controller
 */

export class CityController {
  /**
   * @constructor
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {ResponseUtil} responseUtil
   * @param {CityService} CityService
   */
  constructor(
    private responseUtil: ResponseUtil,
    private cityService: CityService,
  ) {}

  /**
   * Get All
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} cities payload
   * @memberof CityController
   */

  getAllCities = async (
    req: IRequestWithAdmin,
    res: Response,
  ): Promise<Response> => {
    const cityList = await this.cityService.findAll();

    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { cityList: cityList },
      res,
    });

  };

}
