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

  @Get('set-cookie-example')
  setCookieExample(@Res() res: Response): Response {
    return res
      .cookie(
        'test',
        CryptoJS.AES.encrypt('Hello World!', 'a_secret').toString(),
        {
          domain: '.createbase.co.nz',
          expires: new Date(Date.now() + Math.pow(9, 10)),
          secure: true,
        },
      )
      .status(200)
      .send('Cookie Set');
  }

  @Get('get-cookie-example')
  getCookieExample(@Req() req: Request, @Res() res: Response): Response {
    return res
      .status(200)
      .send(
        CryptoJS.AES.decrypt(req.cookies['test'], 'a_secret').toString(
          CryptoJS.enc.Utf8,
        ),
      );
  }

  @Post('convert-date')
  convertDate(@Body() body: any): any {
    const parsedDate: number = body.parsedDate;
    const timezone: string = body.timezone;
    return this.appService.dateConverter(parsedDate, timezone);
  }
}
