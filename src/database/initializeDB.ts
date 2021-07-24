import { createConnection } from 'typeorm';
import logger from '../utils/logger';

export const initializeDB = async (): Promise<void> => {
  try {
    const conn = await createConnection();
    console.log(
      `Database: ${conn.options.database} is successfully initialized`,
    );
  } catch (error) {
    console.log('>>>', error);
    console.log(`Database failed to connect ${error.message}`);
  }
};
