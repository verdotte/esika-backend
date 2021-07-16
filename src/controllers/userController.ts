import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { UserService } from '../database/services';
import { OK } from '../constants/statusCodes';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';
import { UpdateUserDto } from '../dtos/updateUserDto'; 
import { updated } from '../constants/responseMessages';
import { paginator } from '../utils/paginator';
import { PAGE_LIMIT } from '../constants/shared';

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
   * @param {IRequestWithUser} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof UserController
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

  /**
   * Get All Host
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} users payload
   * @memberof UserController
   */
  getAllHost = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const userList = await this.userService.findByUserType('host', pageNumber);
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { host: userList, currentPage, pageSize: PAGE_LIMIT },
      res,
    });
  };

  /**
   * Update info
   * @author Desire Kaleba
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {User} user payload
   * @memberof UserController
   */
   updateProfile = async (req: Request, res: Response): Promise<Response> => {
     const userId = parseInt(req.params.userId, 10);
     const updatedInfo: UpdateUserDto = req.body;

     const updatedUser = await this.userService.update(userId, updatedInfo);
    
     return this.responseUtil.success({
        statusCode: OK,
        message: updated('Your information'),
        data: updatedUser,
        res,
     });
  };
}
