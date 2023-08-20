import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PublishersService } from 'src/publishers/publishers.service';
import { error } from 'console';
import { format } from 'util';

@Controller('games')
export class GamesController {
  @Inject(PublishersService)
  private readonly publisherService: PublishersService;
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameData: CreateGameDto) {
    try {
      return await this.gamesService.create(createGameData);
    } catch (err) {
      console.log(err);
      error(format(err, 'GamesController->Create'));
    }
  }

  @Get()
  findAll() {
    try {
      return this.gamesService.findAll();
    } catch (err) {
      console.log(err);
      error(format(err, 'GamesController->FindAll'));
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.gamesService.findOne(id);
    } catch (err) {
      console.log(err);
      error(format(err, 'GamesController->FindOne'));
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    try {
      return this.gamesService.update(id, updateGameDto);
    } catch (err) {
      console.log(err);
      error(format(err, 'GamesController->Update'));
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.gamesService.remove(id);
    } catch (err) {
      console.log(err);
      error(format(err, 'GamesController->Delete'));
    }
  }
}
