import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PublishersModule } from './publishers/publishers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://dgvasconcelos99:${process.env.NODE_DATABASE_PW}@cluster0.crksd5k.mongodb.net/`,
    ),
    PublishersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
