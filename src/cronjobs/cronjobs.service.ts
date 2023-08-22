import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GamesService } from 'src/games/games.service';

@Injectable()
export class CronjobsService {
  constructor(
    @Inject(forwardRef(() => GamesService))
    private readonly gameService: GamesService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async removeDeprecatedGames() {
    return await this.gameService.handleDeprecatedGames();
  }
}
