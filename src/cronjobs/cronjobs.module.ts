import { Module, forwardRef } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  providers: [CronjobsService],
  imports: [forwardRef(() => GamesModule)],
})
export class CronjobsModule {}
