import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './group.controller';
import { GroupSchema } from './group.schema';
import { GroupService } from './group.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'Group', schema: GroupSchema }],
      'default',
    ),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
