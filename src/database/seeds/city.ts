import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { City } from '../entity/City';
import { cityData } from '../data/city.data';

export default class CreateCity implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(City)
      .values(cityData)
      .execute();
  }
}
