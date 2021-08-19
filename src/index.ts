import 'reflect-metadata';
import { App } from './app';
import { routes } from './routes/index';
import { initializeDB } from './database/initializeDB';
import { registerEvents } from './cores/registerEvent';

const app = new App(routes);

(async () => {
  await initializeDB();
  registerEvents();
  app.listen();
})();
