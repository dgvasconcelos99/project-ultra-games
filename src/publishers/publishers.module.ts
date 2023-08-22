import { Module, forwardRef } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { PublishersController } from './publishers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublisherEntity]),
    forwardRef(() => GamesModule),
  ],
  controllers: [PublishersController],
  providers: [PublishersService],
  exports: [PublishersService],
})
export class PublishersModule {}
