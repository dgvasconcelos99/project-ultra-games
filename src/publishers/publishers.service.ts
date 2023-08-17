import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher, PublisherDocument } from './entities/publisher.entity';

@Injectable()
export class PublishersService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
  ) {}

  create(createPublisherDto: CreatePublisherDto) {
    const publisher = new this.publisherModel(createPublisherDto);

    return publisher.save();
  }

  findAll() {
    return this.publisherModel.find();
  }

  findOne(id: string) {
    return this.publisherModel.findById(id);
  }

  update(id: string, updatePublisherDto: UpdatePublisherDto) {
    return this.publisherModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatePublisherDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.publisherModel.deleteOne({ _id: id }).exec();
  }
}
