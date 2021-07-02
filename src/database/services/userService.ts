import { User } from '../entity/User';

/**
 * User Controller
 */
export class UserService {
  /**
   * Find Phone Number
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} phoneNumber
   * @returns {User | null} user payload
   * @memberof UserService
   */
  findPhoneNumber = async (phoneNumber: string): Promise<User | null> => {
    const user = await User.findOne({ phoneNumber });
    return user ?? null;
  };

  /**
   * Create
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {User} userData
   * @returns {User | null} user payload
   * @memberof UserService
   */
  create = async (userData: User): Promise<User> => {
    return User.create(userData).save();
  };
}
