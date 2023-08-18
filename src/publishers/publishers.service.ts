import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherEntity } from './entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
  ) {}

  async create(createPublisherData: CreatePublisherDto) {
    return this.publisherRepository.save(createPublisherData);
  }

  async findAll() {
    return this.publisherRepository.find();
  }

  async findOne(id: number) {
    return this.publisherRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updatePublisherData: UpdatePublisherDto) {
    return this.publisherRepository.update(id, updatePublisherData);
  }

  async remove(id: number) {
    return this.publisherRepository.delete(id);
  }
}
