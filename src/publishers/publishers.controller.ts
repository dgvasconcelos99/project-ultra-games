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
import { Observable } from 'rxjs';
import { PublisherEntity } from './entities/publisher.entity';
import { UpdateResult } from 'typeorm';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  create(
    @Body() createPublisherDto: CreatePublisherDto,
  ): Observable<CreatePublisherDto> {
    return this.publishersService.create(createPublisherDto);
  }

  @Get()
  findAll(): Observable<PublisherEntity[]> {
    return this.publishersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ): Observable<UpdateResult> {
    return this.publishersService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(id);
  }
}
