import { Log } from './schema/Log';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BestNumber } from './schema/BestNumber';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(BestNumber.name) private numberModel: Model<BestNumber>,
  @InjectModel(Log.name) private logModel: Model<Log>) {}

  async voteNumber(number: number) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const date = day + '-' + month + '-' + year;

    const newVote = this.numberModel({
      number,
      date
    });
    return await newVote.save();
  }

  async findNumbers(date: string) {
    return await this.numberModel.find({date: date});
  }

  async getLogs() {
    return await this.logModel.find();
  }

}
