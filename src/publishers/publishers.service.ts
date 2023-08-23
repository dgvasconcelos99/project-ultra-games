import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherEntity } from './entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GamesService } from 'src/games/games.service';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
    @Inject(GamesService)
    private readonly gameService: GamesService,
  ) {}

  async create(
    createPublisherData: CreatePublisherDto,
  ): Promise<CreatePublisherDto> {
    return this.publisherRepository.save(createPublisherData);
  }

  async findAll(): Promise<PublisherEntity[]> {
    return this.publisherRepository.find();
  }

  async findOne(id: string) {
    return await this.publisherRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByGame(name: string): Promise<PublisherEntity> {
    const searchGame = await this.gameService.findByName(name);

    if (!searchGame[0]) {
      throw new HttpException('No games found', HttpStatus.NOT_FOUND);
    }

    const searchPublisher = await this.publisherRepository.findOne({
      where: { id: searchGame[0].games_publisherId.id },
    });

    return searchPublisher;
  }

  async update(
    id: string,
    updatePublisherData: UpdatePublisherDto,
  ): Promise<UpdateResult> {
    return await this.publisherRepository.update(id, updatePublisherData);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.publisherRepository.delete(id);
  }
}
