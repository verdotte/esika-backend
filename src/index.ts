import 'reflect-metadata';
import { App } from './app';
import { routes } from './routes/index';
import { initializeDB } from './database/initializeDB';

const app = new App(routes);

(async () => {
  await initializeDB();
  app.listen();
})();
