import { LoggingInterceptor } from './shared/logging.interceptor';
import { Log, LogSchema } from './schema/Log';
import { NumberSchema } from './schema/BestNumber';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BestNumber } from './schema/BestNumber';
import { APP_INTERCEPTOR } from '@nestjs/core';

const connectionString = `mongodb+srv://moonlight:382001@cluster0.zkmbj.mongodb.net/best_number?retryWrites=true&w=majority`;

@Module({
  imports: [MongooseModule.forRoot(connectionString), MongooseModule.forFeature([{name: BestNumber.name, schema: NumberSchema}]), MongooseModule.forFeature([{name: Log.name, schema: LogSchema}])],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  }],
})
export class AppModule {}
