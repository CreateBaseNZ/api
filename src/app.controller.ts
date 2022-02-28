import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('set-cookie')
  setCookie(@Res() res: Response): Response {
    return res.cookie('test', 'Hello World!', {
      domain: '.createbase.co.nz',
      expires: new Date(Date.now() + Math.pow(9, 10)),
      secure: true,
    });
  }

  @Get('get-cookie')
  getCookie(@Req() req: Request): Request {
    return req.cookies['test'];
  }

  @Post('convert-date')
  convertDate(@Body() body: any): any {
    const parsedDate: number = body.parsedDate;
    const timezone: string = body.timezone;
    return this.appService.dateConverter(parsedDate, timezone);
  }
}
