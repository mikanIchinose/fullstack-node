import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('class logger');
    next();
  }
}

export function functional_logger(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('functional logging');
  next();
}

export function global_logger(req: Request, res: Response, next: NextFunction) {
  console.log(`global logging`);
  next();
}
