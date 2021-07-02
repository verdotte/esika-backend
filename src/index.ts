import 'reflect-metadata';
import { App } from './app';
import { routes } from './routes/index';
import { intializeDB } from './database/initializeDB';

const app = new App(routes);

(async () => {
  await intializeDB();
  app.listen();
})();
