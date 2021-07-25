import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

export class DocsRoute implements IRoute {
  public path = '/docs';
  public router = Router();

  private swaggerFile: any = path.join(__dirname, '../', 'docs', 'swagger.json');
  private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
  private swaggerDocument = JSON.parse(this.swaggerData);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .use(`${this.path}`,
      swaggerUI.serve,
      swaggerUI.setup(this.swaggerDocument));
  }
}
