import { Response } from 'express';

export interface ISuccess {
  statusCode: number;
  message: string;
  data: unknown;
  res: Response;
}

export interface IError {
  statusCode: number;
  message: string;
  res: Response;
}
