import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pizza extends Document {
  @Prop({ required: true })
  pizzaName: string;

  @Prop({ required: true })
  price: number;
}

export const pizzaSchema = SchemaFactory.createForClass(Pizza);
