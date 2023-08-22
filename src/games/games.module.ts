import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { PublishersModule } from 'src/publishers/publishers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity]),
    forwardRef(() => PublishersModule),
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
