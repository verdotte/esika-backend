import { User } from '../entity/User';
import { CreateUserDto } from '../../dtos/createUserDto';

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
   * Find By Id
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {number} userId
   * @returns {User | null} user payload
   * @memberof UserService
   */
  findById = async (userId: number): Promise<User | null> => {
    const user = await User.findOne({ userId });
    return user ?? null;
  };

  /**
   * Update By Phone Number
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} phoneNumber
   * @returns {User | null} user payload
   * @memberof UserService
   */
  updateByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const userFound = await User.findOne({ phoneNumber: phoneNumber });
    if (!userFound) {
      throw new Error(
        `The user with phone number: ${phoneNumber} does not exist!`,
      );
    }
    Object.assign(userFound, { verified: true });
    return await userFound.save();
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
  create = async (userData: CreateUserDto): Promise<User> => {
    return User.create(userData).save();
  };

  /**
   * Find By userType
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {string} userType
   * @returns {User[]} users payload
   * @memberof UserService
   */

  findByUserType = async (userType: string): Promise<User[]> => {
    const users = await User.find({ where: { userType: userType }});
    return users;
  };
}
