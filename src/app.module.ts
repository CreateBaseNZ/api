import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingModule } from './tracking/tracking.module';
import { LicenseModule } from './license/license.module';
import { GroupModule } from './group/group.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE, { connectionName: 'default' }),
    MongooseModule.forRoot(process.env.DATABASE_PROD, {
      connectionName: 'prod',
    }),
    MongooseModule.forRoot(process.env.DATABASE_DEV, { connectionName: 'dev' }),
    TrackingModule,
    LicenseModule,
    GroupModule,
    ClassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
