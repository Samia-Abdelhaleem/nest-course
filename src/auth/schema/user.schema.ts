import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  roles: string[];
  @Prop()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
