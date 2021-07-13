import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET_KEY } = process.env;

/**
 * TokenUtil
 */
export class TokenUtil {
  /**
   * Generate
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} id
   * @returns {string} the generated token
   * @memberof TokenUtil
   */
  generate = (id: number): string => {
    return jwt.sign({ id }, JWT_SECRET_KEY as string, { expiresIn: '1d' });
  };

  /**
   * Decode
   * @deprecated
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} token
   * @returns {unknown} the decoded token
   * @memberof TokenUtil
   */
  decode = (token: string): any => {
    try {
      return jwt.verify(token, `${JWT_SECRET_KEY}`);
    } catch (error) {
      return error;
    }
  };

  /**
   * Ran
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} min
   * @param {number} max
   * @returns {number} random number
   * @memberof TokenUtil
   */
  private ran = (min: number, max: number): number => {
    const random: number = Math.random();
    return Math.floor(random * (max - min) + min);
  };

  /**
   * Slug Generator
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} length
   * @returns {string} random code
   * @memberof TokenUtil
   */
  slugGenerator = (length: number): string => {
    length = length || 10;

    const allowsChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    while (code.length < length) {
      const charIndex: number = this.ran(0, allowsChars.length - 1);
      code += allowsChars[charIndex];
    }
    return code;
  };
}
