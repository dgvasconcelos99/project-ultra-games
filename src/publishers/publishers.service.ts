import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherEntity } from './entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
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
