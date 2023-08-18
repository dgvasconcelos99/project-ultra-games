import { Prop, Schema } from '@nestjs/mongoose';

export class Game {}

@Schema()
export class Game {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  publisher: Publisher;
}
