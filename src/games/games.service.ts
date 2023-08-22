import {
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PublishersService } from 'src/publishers/publishers.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @Inject(forwardRef(() => PublishersService))
    private readonly publisherService: PublishersService,
  ) {}
  async create(createGameData: CreateGameDto): Promise<GameEntity> {
    const searchPublisher = await this.publisherService.findOne(
      createGameData.publisherId,
    );

    if (!searchPublisher.id) throw new NotFoundException();

    const dataToCreate: GameEntity = {
      ...createGameData,
      releaseDate: new Date(createGameData.releaseDate),
      publisher: searchPublisher,
    };

    return this.gameRepository.save(dataToCreate);
  }

  async findAll(): Promise<GameEntity[]> {
    return await this.gameRepository.find();
  }

  async findOne(id: string): Promise<GameEntity> {
    return await this.gameRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateGameData: UpdateGameDto,
  ): Promise<UpdateResult> {
    return await this.gameRepository.update(id, updateGameData);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.gameRepository.delete(id);
  }
}
