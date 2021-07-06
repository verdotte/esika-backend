import { Request, Response } from 'express';
import { ResponseUtil, TokenUtil, PasswordUtil } from '../utils';
import { AdminService } from '../database/services';
import { OK, NOT_FOUND, UNAUTHORIZED } from '../constants/statusCodes';
import { loginSuccess, notExist, incorrectPassword } from '../constants/responseMessages';
import { LoginAdminDto } from '../dtos/loginAdminDto';

/**
 * Auth Controller
 */
export class AuthController {
  /**
   * @constructor
   * @author Verdotte Aututu, Desire Kaleba
   * @since 0.001
   *
   * @param {TokenUtil} tokenUtil
   * @param {ResponseUtil} responseUtil
   * @param {PasswordUtil} passwordUtil
   * @param {AdminService} adminService
   */
  constructor(
    private tokenUtil: TokenUtil,
    private responseUtil: ResponseUtil,
    private passwordUtil: PasswordUtil,
    private adminService: AdminService,
  ) {}

  /**
   * Login
   * @author Desire Kaleba
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AuthController
   */
  login = async (req: Request, res: Response): Promise<Response> => {

    // Get admin information
    const adminInfo: LoginAdminDto = req.body;

    // Fetch the specific admin
    const foundAdmin = await this.adminService.findUsername(adminInfo.username); 
    
    // Check if the admin exists
    // and return not found not
    if (foundAdmin === null) {
      return this.responseUtil.error({
        statusCode: NOT_FOUND,
        message: notExist(adminInfo.username),
        res,
      });
    }

    // Check if the provided password matches the stored password
    // and return unauthorized if not
    const isPasswordCorrect = this.passwordUtil.compare(adminInfo.password, foundAdmin.password);
    if (!isPasswordCorrect) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: incorrectPassword(),
        res,
        });
    }
    
    // Generate the admin token
    // and return it along with his information
    const token = this.tokenUtil.generate(foundAdmin.adminId);
    return this.responseUtil.success({
      statusCode: OK,
      message: loginSuccess(),
      data: { token, username: foundAdmin.username },
      res,
    });
  };
}
