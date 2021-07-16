import { createConnection } from 'typeorm';
import config from '../../ormconfig';
import logger from '../utils/logger';

export const initializeDB = async (): Promise<void> => {
  try {
    const conn = await createConnection(config);
    logger.info(`Database: ${conn.options.database} is successfully initialized`);
  } catch (error) {
    logger.error(`Database failed to connect ${error.message}`);
  }
};