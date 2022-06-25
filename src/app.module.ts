import { Module } from '@nestjs/common';
import { validationSchema } from 'env.validationSchema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer } from '@nestjs/common';
import { AppLoggerMiddleware } from './middleware/loggerMiddleware';
import { HealthModule } from './health/health.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const MONGODB_HOST = configService.get<string>('MONGODB_HOST');
        const MONGODB_USER = configService.get<string>('MONGODB_USER');
        const MONGODB_PASSWORD = configService.get<string>('MONGODB_PASSWORD');
        const MONGODB_DBNAME = configService.get<string>('MONGODB_DBNAME');
        const MONGODB_PORT = configService.get<string>('MONGODB_PORT');
        const MONGODB_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}?authMechanism=DEFAULT`;
        console.log(MONGODB_URI);

        return {
          uri: MONGODB_URI,
          autoIndex: true,
        };
      },
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
