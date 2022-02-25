import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LicenseController } from './license.controller';
import { LicenseSchema } from './license.schema';
import { LicenseService } from './license.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'License', schema: LicenseSchema }],
      'default',
    ),
  ],
  controllers: [LicenseController],
  providers: [LicenseService],
  exports: [LicenseService],
})
export class LicenseModule {}
