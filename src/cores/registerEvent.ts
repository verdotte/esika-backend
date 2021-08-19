import dotenv from 'dotenv';
import { EventEmitter } from 'events';
import { algoliaService } from '../plugins/algolia';

dotenv.config();

const { NODE_ENV } = process.env;

export const notifEvent = new EventEmitter();

export const registerEvents = () => {
  if (NODE_ENV !== 'test') {
    notifEvent.on('create-index', algoliaService.createIndex);
    notifEvent.on('update-index', algoliaService.updateIndex);
    notifEvent.on('delete-index', algoliaService.deleteIndex);
  }
};
