import { Admin } from '../entity/Admin';
import { CreateAdminDto } from '../../dtos/createAdminDto';

/**
 * Admin Service
 */
export class AdminService {
  /**
   * Find Username
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} username
   * @returns {Admin | null} admin payload
   * @memberof AdminService
   */
  findUsername = async (username: string): Promise<Admin | null> => {
    const admin = await Admin.findOne({ username });
    return admin ?? null;
  };

  /**
   * Create
   * @author Verdotte Aututu, Desire Kaleba
   * @since 0.001
   *
   * @param {CreateAdminDto} adminData
   * @returns {Admin | null} admin payload
   * @memberof AdminService
   */
  create = async (adminData: CreateAdminDto): Promise<Admin> => {
    return await Admin.create(adminData).save();
  };
}
