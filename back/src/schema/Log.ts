import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
    @Prop()
    url: string;

    @Prop()
    date: string;

    @Prop()
    json: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);