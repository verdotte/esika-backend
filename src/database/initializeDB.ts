import { createConnection } from 'typeorm';
import config from '../../ormconfig';

export const initializeDB = async (): Promise<void> => {
  try {
    const conn = await createConnection(config);
    console.log(
      `Database: ${conn.options.database} is successfully initialized`,
    );
  } catch (error) {
    console.log(`Database failed to connect ${error.message}`);
  }
};