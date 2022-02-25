import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  pizza: string;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
