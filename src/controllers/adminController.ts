import { Request, Response } from 'express';
import { ResponseUtil, TokenUtil, PasswordUtil } from '../utils';
import { AdminService } from '../database/services';
import { CREATED } from '../constants/statusCodes';
import { created } from '../constants/responseMessages';
import { CreateAdminDto } from '../dtos/createAdminDto';

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
   * @memberof AuthController
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
}
