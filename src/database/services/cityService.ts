import { City } from '../entity/City';

/**
 * City Service
 */
export class CityService {

  /**
   * Find All
   * @author Dan Mugsio
   * @since 0.001
   *
   * @returns {Array[unknown]}
   * @memberof CityService
   */

  findAll = async (): Promise<City[]> => {
    const cities = await City.find();
    return cities;
  };
}
