import { Body, Controller, Post } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { TrackingService } from './tracking.service';

interface HttpReturn {
  status: string;
  content: any;
}

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('build')
  async build(): Promise<void> {
    await this.trackingService.buildTracking();
    return;
  }

  @Post('create')
  async create(@Body() body: any): Promise<HttpReturn> {
    let data = body.input;
    data = this.trackingService.setIds(data);
    try {
      await this.trackingService.create(data);
    } catch (error) {
      return { status: 'error', content: error };
    }
    return { status: 'succeeded', content: undefined };
  }

  @Post('retrieve')
  async retrieve(@Body() body: any): Promise<HttpReturn> {
    const query = body.input;
    let data;
    try {
      data = await this.trackingService.find(query);
    } catch (error) {
      return { status: 'error', content: error };
    }
    return { status: 'succeeded', content: data };
  }
}
