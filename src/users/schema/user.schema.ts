import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  roles: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);
