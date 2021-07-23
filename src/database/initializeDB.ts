import { createConnection } from 'typeorm';
import logger from '../utils/logger';

export const initializeDB = async (): Promise<void> => {
  try {
    const conn = await createConnection();
    logger.info(
      `Database: ${conn.options.database} is successfully initialized`,
    );
  } catch (error) {
    logger.info(`Database failed to connect ${error.message}`);
  }
};
