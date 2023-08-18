import { Test, TestingModule } from '@nestjs/testing';
import { PublishersService } from './publishers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PublisherEntity } from './entities/publisher.entity';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto';

describe('PublishersService', () => {
  let service: PublishersService;
  let publisherRepository: Repository<PublisherEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishersService,
        {
          provide: getRepositoryToken(PublisherEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PublishersService>(PublishersService);
    publisherRepository = module.get<Repository<PublisherEntity>>(
      getRepositoryToken(PublisherEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(publisherRepository).toBeDefined();
  });

  describe('save', () => {
    it('should save a new publisher', async () => {
      const data: CreatePublisherDto = {
        name: 'Ubisoft',
        siret: 1,
        phone: '+1111111111',
      };
      const result = await service.create(data);

      expect(result).toBeDefined();
      expect(publisherRepository.create).toBeCalledTimes(1);
    });
  });
});
