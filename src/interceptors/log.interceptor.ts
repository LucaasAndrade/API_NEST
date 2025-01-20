import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const temp = new Date();
    return next.handle().pipe(
      tap(() => {
        console.log('Method: ' + context.switchToHttp().getRequest().method);
        console.log('URL: ' + context.switchToHttp().getRequest().url);
        console.log(`Request time: ${new Date().getTime() - temp.getTime()}ms`);
      }),
    );
  }
}
