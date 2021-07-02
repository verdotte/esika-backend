import * as bcrypt from 'bcrypt';

/**
 * PasswordUtil
 */
export class PasswordUtil {
  /**
   * Hash
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} password password to hash
   * @returns {string} hashed password
   * @memberof PasswordUtil
   */
  hash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  /**
   * Compare
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} password password to hash
   * @param {string} hashedPassword hashed password
   * @returns {boolean} true or false
   * @memberof PasswordUtil
   */
  compare = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
  };
}
