import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  street: string;
}

export const userSchema = SchemaFactory.createForClass(User);
