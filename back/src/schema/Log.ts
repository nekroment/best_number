import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
    @Prop()
    url: string;

    @Prop()
    date: string;

    @Prop()
    json: {
        query: string[];
        body: string[];
        headers: string[];
    };
}

export const LogSchema = SchemaFactory.createForClass(Log);