import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import * as CryptoJS from 'crypto-js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('set-cookie')
  setCookie(@Res() res: Response): Response {
    return res
      .cookie('test', CryptoJS.AES.encrypt('Hello World', 'a_secret'), {
        domain: '.createbase.co.nz',
        expires: new Date(Date.now() + Math.pow(9, 10)),
        secure: true,
      })
      .status(200)
      .send('Cookie Set');
  }

  @Get('get-cookie')
  getCookie(@Req() req: Request, @Res() res: Response): Response {
    return res
      .status(200)
      .send(CryptoJS.AES.decrypt(req.cookies['test'], 'a_secret'));
  }

  @Post('convert-date')
  convertDate(@Body() body: any): any {
    const parsedDate: number = body.parsedDate;
    const timezone: string = body.timezone;
    return this.appService.dateConverter(parsedDate, timezone);
  }
}
