import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Publisher, PublisherSchema } from './entities/publisher.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publisher.name, schema: PublisherSchema },
    ]),
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
