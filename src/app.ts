import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { IRoute } from './interfaces/route.interface';

export class App {
  public app: express.Application;
  public port: number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeroutes(routes);
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }

  private initializeroutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1/', route.router);
    });
  }

  listen(): void {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }

  getServer = () => this.app;
}
