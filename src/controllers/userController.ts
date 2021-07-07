import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { UserService } from '../database/services';
import { OK } from '../constants/statusCodes';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';

/**
 * User Controller
 */
export class UserController {
  /**
   * @constructor
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {ResponseUtil} responseUtil
   * @param {UserService} userService
   */
  constructor(
    private responseUtil: ResponseUtil,
    private userService: UserService,
  ) {}

  /**
   * Get Profile
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AuthController
   */
  getProfile = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser } = req;
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: currentUser },
      res,
    });
  };
}
