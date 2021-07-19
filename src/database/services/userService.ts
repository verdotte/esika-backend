import { User } from '../entity/User';
import { CreateUserDto } from '../../dtos/createUserDto';
import { UpdateUserDto } from '../../dtos/updateUserDto';
import { PAGE_LIMIT } from '../../constants/shared';

/**
 * User Service
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
    return await User.create(userData).save();
  };

  /**
   * Find By User Type
   * @author Dan Mugisho
   * @since 0.001
   *
   * @param {string} userType
   * @param {number} pageNumber
   * @returns {User[]} users payload
   * @memberof UserService
   */

  findByUserType = async (userType: string, pageNumber: number): Promise<User[]> => {
    const users = await User.find({ where: { userType }, take: PAGE_LIMIT, skip: pageNumber });
    return users;
  };

    /**
   * Update
   * @author Desire Kaleba
   * @since 0.001
   *
   * @param {number} userId
   * @param {UpdateUserDto} updatedInfo
   * @returns {User | null} user payload
   * @memberof UserService
   */
     update = async (userId: number, updatedInfo: UpdateUserDto): Promise<User | null> => {
       const user = await this.findById(userId);
       if (user) {
          User.merge(user, updatedInfo);
          const updatedUser = await User.save(user);
          return updatedUser;
       }
       return null;
       
    };
}
