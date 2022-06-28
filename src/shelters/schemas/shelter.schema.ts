import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { object } from 'joi';

export type ShelterDocument = Shelter & Document;

@Schema()
export class Shelter {
  @Prop()
  name: string;

  @Prop({ type: object })
  address: {
    street: string;
    zip: number;
  };

  @Prop()
  contact: {
    phone: string;
    mobile: string;
    email: string;
  };

  @Prop()
  cats: string[];
}

export const ShelterSchema = SchemaFactory.createForClass(Shelter);
