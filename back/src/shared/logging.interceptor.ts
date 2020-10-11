import { query } from 'express';
import { Log } from './../schema/Log';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Model } from 'mongoose';
import { format } from 'util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}
  private readonly logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const date = day + '-' + month + '-' + year + ' ' + hour + ':' + minute;

    return next.handle().pipe(
      tap(response => {


        const json = {
            query: req.query,
            body: req.body,
            headers: req.headers
        }

        const newLog = this.logModel({
          date,
          url,
          json
        });

        newLog.save();

        this.logger.log(
          format('%s %s %dms %s', method, url, date, json),
        );
      }),
    );
  }
}
