import { Request, Response } from 'express';
import { ResponseUtil } from '../utils';
import { UserService } from '../database/services';
import { OK, UNAUTHORIZED } from '../constants/statusCodes';
import { IRequestWithUser } from '../interfaces/requestWithUser.interface';
import { UpdateUserDto } from '../dtos/updateUserDto';
import { updated } from '../constants/responseMessages';
import { paginator } from '../utils/paginator';
import { PAGE_LIMIT } from '../constants/shared';
import { UserType } from '../database/entity/User';

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
   * Get Current Profile
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IRequestWithUser} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof UserController
   */
  getCurrentProfile = async (
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
   * @author Dan Mugisho, Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {array} users payload
   * @memberof UserController
   */
  getAllAgent = async (req: Request, res: Response): Promise<Response> => {
    const { page = 0 } = req.query;
    const currentPage: number = +page;
    const pageNumber = paginator(currentPage, PAGE_LIMIT);
    const agentList = await this.userService.findByUserType(
      UserType.AGENT,
      pageNumber,
    );
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { agentList, currentPage, pageSize: PAGE_LIMIT },
      res,
    });
  };

  /**
   * Update info
   * @author Desire Kaleba
   * @since 0.001
   * @deprecated
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

  /**
   * Edit Profile
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IRequestWithUser} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof UserController
   */
  editProfile = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser, userProfile } = req;
    const updatedInfo: UpdateUserDto = req.body;

    if (currentUser.userId !== userProfile.userId) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    Object.assign(userProfile, updatedInfo);
    await userProfile.save();
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: userProfile },
      res,
    });
  };

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
    const { userProfile } = req;
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: userProfile },
      res,
    });
  };

  /**
   * Deactivate User
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IRequestWithUser} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof UserController
   */
  deactivateUser = async (
    req: IRequestWithUser,
    res: Response,
  ): Promise<Response> => {
    const { currentUser, userProfile } = req;

    if (currentUser.userId !== userProfile.userId) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `Unauthorized access for user`,
        res,
      });
    }

    Object.assign(userProfile, { active: false, verified: false });
    await userProfile.save();
    return this.responseUtil.success({
      statusCode: OK,
      message: `user successfully deactivated`,
      data: { profile: userProfile },
      res,
    });
  };
}
