import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('convert-date')
  convertDate(@Body() body: any): any {
    const parsedDate: number = body.parsedDate;
    const timezone: string = body.timezone;
    return this.appService.dateConverter(parsedDate, timezone);
  }
}
