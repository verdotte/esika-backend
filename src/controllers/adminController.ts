import { Request, Response } from 'express';
import { ResponseUtil, TokenUtil, PasswordUtil } from '../utils';
import { AdminService } from '../database/services';
import { CREATED, OK, NOT_FOUND, UNAUTHORIZED } from '../constants/statusCodes';
import {
  created,
  loginSuccess,
  incorrectPassword,
  notExist,
} from '../constants/responseMessages';
import { CreateAdminDto } from '../dtos/createAdminDto';
import { LoginAdminDto } from '../dtos/loginAdminDto';
import { IRequestWithAdmin } from '../interfaces/requestWithAdmin.interface';

/**
 * Admin Controller
 */
export class AdminController {
  /**
   * @constructor
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {TokenUtil} tokenUtil
   * @param {PasswordUtil} passwordUtil
   * @param {ResponseUtil} responseUtil
   * @param {AdminService} adminService
   */
  constructor(
    private tokenUtil: TokenUtil,
    private passwordUtil: PasswordUtil,
    private responseUtil: ResponseUtil,
    private adminService: AdminService,
  ) {}

  /**
   * Create Admin
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AdminController
   */
  createAdmin = async (req: Request, res: Response): Promise<Response> => {
    const adminData: CreateAdminDto = req.body;
    const hashedPassord = this.passwordUtil.hash(adminData.password);

    const newAdmin = await this.adminService.create({
      ...adminData,
      password: hashedPassord,
    });
    const token = this.tokenUtil.generate(newAdmin.adminId);

    return this.responseUtil.success({
      statusCode: CREATED,
      message: created('admin'),
      data: { token, username: newAdmin.username },
      res,
    });
  };

  /**
   * Login
   * @author Desire Kaleba
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AdminController
   */
  login = async (req: Request, res: Response): Promise<Response> => {
    const adminInfo: LoginAdminDto = req.body;

    const foundAdmin = await this.adminService.findUsername(adminInfo.username);

    if (foundAdmin === null) {
      return this.responseUtil.error({
        statusCode: NOT_FOUND,
        message: notExist(adminInfo.username),
        res,
      });
    }

    const isPasswordCorrect = this.passwordUtil.compare(
      adminInfo.password,
      foundAdmin.password,
    );
    if (!isPasswordCorrect) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: incorrectPassword(),
        res,
      });
    }

    const token = this.tokenUtil.generate(foundAdmin.adminId);
    return this.responseUtil.success({
      statusCode: OK,
      message: loginSuccess(),
      data: { token, username: foundAdmin.username },
      res,
    });
  };

  /**
   * Get Admin Profile
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AdminController
   */
  getAdminProfile = async (
    req: IRequestWithAdmin,
    res: Response,
  ): Promise<Response> => {
    const { currentAdmin } = req;
    return this.responseUtil.success({
      statusCode: OK,
      message: `success`,
      data: { profile: currentAdmin },
      res,
    });
  };
}
