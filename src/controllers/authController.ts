import { Request, Response } from 'express';
import { ResponseUtil, TokenUtil } from '../utils';

import { OK } from '../constants/statusCodes';
import { created } from '../constants/responseMessages';

/**
 * Auth Controller
 */
export class AuthController {
  /**
   * @constructor
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {TokenUtil} tokenUtil
   * @param {ResponseUtil} responseUtil
   */
  constructor(
    private tokenUtil: TokenUtil,
    private responseUtil: ResponseUtil,
  ) {}

  /**
   * Login
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AuthController
   */
  login = (req: Request, res: Response): void => {
    this.responseUtil.success({
      statusCode: OK,
      message: created('user'),
      data: { name: 'verdotte', age: 23 },
      res,
    });
  };
}
