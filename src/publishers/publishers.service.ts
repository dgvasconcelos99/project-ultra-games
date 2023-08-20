import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherEntity } from './entities/publisher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepository: Repository<PublisherEntity>,
  ) {}

  create(
    createPublisherData: CreatePublisherDto,
  ): Observable<CreatePublisherDto> {
    return from(this.publisherRepository.save(createPublisherData));
  }

  findAll(): Observable<PublisherEntity[]> {
    return from(this.publisherRepository.find());
  }

  findOne(id: string) {
    return this.publisherRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  update(
    id: string,
    updatePublisherData: UpdatePublisherDto,
  ): Observable<UpdateResult> {
    return from(this.publisherRepository.update(id, updatePublisherData));
  }

  remove(id: string): Observable<DeleteResult> {
    return from(this.publisherRepository.delete(id));
  }
}
