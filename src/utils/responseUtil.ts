import { Response } from 'express';
import { ISuccess, IError } from '../interfaces/response.interface';

/**
 * ResponseUtil
 */
export class ResponseUtil {
  /**
   * Success
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Isuccess} { statusCode, message, data, res }
   * @returns {Response} response
   * @memberof ResponseUtil
   */
  success = ({ statusCode, message, data, res }: ISuccess): Response => {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
  };

  /**
   * Error
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {Ierror} { statusCode, error, res }
   * @returns {Response} response
   * @memberof ResponseUtil
   */
  error = ({ statusCode, message, res }: IError): Response => {
    return res.status(statusCode).json({
      status: statusCode,
      message,
    });
  };
}
