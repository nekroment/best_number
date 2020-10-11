import { BestNumber } from './schema/BestNumber';
import { Body, Controller, Get, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';
import { query} from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/vote')
  async voteNumber(@Body() body: BestNumber) {
    try {
      const newVote = await this.appService.voteNumber(body.number);
      return {message: `Vote for ${body.number} confirmed`}
    } catch (error) {}
  }

  @Get('/statistic')
  async getStatistic(@Query() query) {
    try {
      return await this.appService.findNumbers(query.date);
    } catch (error) {}
  }

  @Get('/logs')
  async getLogs() {
    try {
      return await this.appService.getLogs();
    } catch (error) {}
  }
}
