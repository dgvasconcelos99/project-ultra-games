import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';
import { PublisherEntity } from 'src/publishers/entities/publisher.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
  ) {}
  async create(createGameData: CreateGameDto): Promise<CreateGameDto> {
    const searchPublisher = await this.publisherRepository.findOne({
      where: {
        id: createGameData.publisherId,
      },
    });

    if (!searchPublisher.id) throw new NotFoundException();

    const dataToCreate = {
      ...createGameData,
      publisher: searchPublisher,
    };

    return this.gameRepository.save(dataToCreate);
  }

  findAll(): Observable<GameEntity[]> {
    return from(this.gameRepository.find());
  }

  findOne(id: string): Observable<GameEntity> {
    return from(
      this.gameRepository.findOne({
        where: {
          id: id,
        },
      }),
    );
  }

  update(id: string, updateGameData: UpdateGameDto): Observable<UpdateResult> {
    return from(this.gameRepository.update(id, updateGameData));
  }

  remove(id: string): Observable<DeleteResult> {
    return from(this.gameRepository.delete(id));
  }
}
