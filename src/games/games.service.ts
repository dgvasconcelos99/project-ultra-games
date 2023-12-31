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
import {
  Between,
  DeleteResult,
  LessThanOrEqual,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
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

  async findByName(name: string): Promise<GameEntity> {
    const searchGame = await this.gameRepository
      .createQueryBuilder('games')
      .where({
        title: Like(`%${name}%`),
      })
      .withDeleted()
      .execute();
    return searchGame;
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

  async handleDeprecatedGames(): Promise<void> {
    const currentDate = new Date();
    const eighteenMonthsAgo = new Date();
    eighteenMonthsAgo.setMonth(currentDate.getMonth() - 18);

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

    await this.gameRepository.softDelete({
      releaseDate: LessThanOrEqual(eighteenMonthsAgo),
    });

    await this.gameRepository.update(
      { releaseDate: Between(twelveMonthsAgo, eighteenMonthsAgo) },
      { price: () => 'price * 0.8' },
    );

    return;
  }
}
