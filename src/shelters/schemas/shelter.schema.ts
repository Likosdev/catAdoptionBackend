import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ShelterDocument = Shelter & Document;

@Schema()
export class Shelter {
  @Prop()
  name: string;

  @Prop()
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
