import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  dateConverter(parsedDate: number, timezone: string): string {
    let date;
    if (timezone == 'UTC') {
      date = moment.utc(`1970-01-01`).add(parsedDate, 'milliseconds');
    } else if (timezone == 'NZ') {
      date = moment(`1970-01-01`)
        .tz('Pacific/Auckland')
        .add(parsedDate, 'milliseconds');
    }

    return date.toString();
  }
}
