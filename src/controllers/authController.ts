import { Request, Response } from 'express';
import { ResponseUtil, TokenUtil } from '../utils';
import { TwilioService } from '../plugins/twilo';
import {
  OK,
  CREATED,
  UNAUTHORIZED,
  FORBIDDEN,
  BAD_REQUEST,
} from '../constants/statusCodes';
import { created, verified, loginSuccess } from '../constants/responseMessages';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserService } from '../database/services';
import { UserType } from '../database/entity/User';

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
    private twilioService: TwilioService,
    private userService: UserService,
  ) {}

  /**
   * Sign Up for user
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AuthController
   */
  signup = async (req: Request, res: Response): Promise<Response> => {
    const { phoneNumber, firstName, lastName }: CreateUserDto = req.body;

    const user = await this.userService.create({
      phoneNumber,
      firstName,
      lastName,
      userType: UserType.NORMAL,
    });

    await this.twilioService.sendVericationCode(phoneNumber);

    return this.responseUtil.success({
      statusCode: CREATED,
      message: created('user'),
      data: {
        phoneNumber: user.phoneNumber,
        fullName: `${user.firstName} ${user.lastName}`,
      },
      res,
    });
  };

  /**
   * Verify User Account
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AuthController
   */
  verifyUserAccount = async (
    req: Request,
    res: Response,
  ): Promise<Response | boolean> => {
    const { phoneNumber, code }: { phoneNumber: string; code: string } =
      req.body;

    const userFound = await this.userService.findPhoneNumber(phoneNumber);

    if (userFound && userFound.verified) {
      return this.responseUtil.error({
        statusCode: BAD_REQUEST,
        message: `Your account has already been verified`,
        res,
      });
    }

    const verifyCode = await this.twilioService.verifyCode(phoneNumber, code);

    if (verifyCode.valid === true && verifyCode.status === 'approved') {
      const user = await this.userService.updateByPhoneNumber(phoneNumber);
      const token = this.tokenUtil.generate(user.userId);
      return this.responseUtil.success({
        statusCode: OK,
        message: verified('user'),
        data: {
          token,
          phoneNumber: user.phoneNumber,
          fullName: `${user.firstName} ${user.lastName}`,
        },
        res,
      });
    }

    return this.responseUtil.error({
      statusCode: BAD_REQUEST,
      message: `wrong verification code`,
      res,
    });
  };

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
  login = async (req: Request, res: Response): Promise<Response> => {
    const { phoneNumber }: { phoneNumber: string } = req.body;

    const user = await this.userService.findPhoneNumber(phoneNumber);

    if (user === null) {
      return this.responseUtil.error({
        statusCode: UNAUTHORIZED,
        message: `incorrect phone number`,
        res,
      });
    }
    if (!user.verified) {
      await this.twilioService.sendVericationCode(phoneNumber);
      return this.responseUtil.error({
        statusCode: FORBIDDEN,
        message: `Check your sms for account verification`,
        res,
      });
    }

    const token = this.tokenUtil.generate(user.userId);
    return this.responseUtil.success({
      statusCode: OK,
      message: loginSuccess(),
      data: {
        token,
        phoneNumber: user.phoneNumber,
        fullName: `${user.firstName} ${user.lastName}`,
      },
      res,
    });
  };

  /**
   * Resend Verification Code
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} user payload
   * @memberof AuthController
   */
  resendVerificationCode = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { phoneNumber }: { phoneNumber: string } = req.body;

    await this.twilioService.sendVericationCode(phoneNumber);

    return this.responseUtil.success({
      statusCode: OK,
      message: `Check your sms for account verification`,
      data: { phoneNumber },
      res,
    });
  };
}
