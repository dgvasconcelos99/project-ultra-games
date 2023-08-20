import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PublisherEntity } from './entities/publisher.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { error } from 'console';
import { format } from 'util';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(
    @Body() createPublisherDto: CreatePublisherDto,
  ): Promise<CreatePublisherDto> {
    try {
      return this.publishersService.create(createPublisherDto);
    } catch (err) {
      console.log(err);
      error(format(err, 'PublishersController->Create'));
    }
  }

  @Get()
  findAll(): Promise<PublisherEntity[]> {
    try {
      return this.publishersService.findAll();
    } catch (err) {
      console.log(err);
      error(format(err, 'PublishersController->FindAll'));
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PublisherEntity> {
    try {
      return this.publishersService.findOne(id);
    } catch (err) {
      console.log(err);
      error(format(err, 'PublishersController->FindOne'));
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ): Promise<UpdateResult> {
    try {
      return this.publishersService.update(id, updatePublisherDto);
    } catch (err) {
      console.log(err);
      error(format(err, 'PublishersController->Update'));
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return this.publishersService.remove(id);
    } catch (err) {
      console.log(err);
      error(format(err, 'PublishersController->Delete'));
    }
  }
}
