import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  shelter: string;

  @Prop()
  image: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
