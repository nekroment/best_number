import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BestNumber extends Document {

    @Prop({required: true})
    number: number;

    @Prop()
    date: string;
}

export const NumberSchema = SchemaFactory.createForClass(BestNumber);