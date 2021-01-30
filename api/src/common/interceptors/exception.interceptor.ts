import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catchError((error) =>
        throwError(new HttpException('New Message', HttpStatus.BAD_GATEWAY)),
      ),
    );
  }
}
