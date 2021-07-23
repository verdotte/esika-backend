import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { IRoute } from './interfaces/route.interface';
import logger, { httpLogStream } from './utils/logger';
import { OK, BAD_REQUEST, FORBIDDEN } from './constants/statusCodes';

export class App {
  public app: express.Application;
  public port: number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeroutes(routes);
    this.initializeDefaultRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(morgan('combined', { stream: httpLogStream }));
    this.app.use(cors());
  }

  private initializeroutes(routes: IRoute[]): void {
    routes.forEach((route) => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeDefaultRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      return res.status(OK).json({
        statusCode: OK,
        message: `Welcome to ESIKA API`,
      });
    });

    this.app.all('/', (req: Request, res: Response) => {
      return res.status(BAD_REQUEST).json({
        statusCode: BAD_REQUEST,
        message: `Invalid method`,
      });
    });

    this.app.use('*', (req: Request, res: Response) => {
      return res.status(FORBIDDEN).json({
        statusCode: FORBIDDEN,
        message: `Invalid route`,
      });
    });
  }

  listen(): void {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      logger.info(`App listening on the port ${port}`);
    });
  }

  getServer = () => this.app;
}
