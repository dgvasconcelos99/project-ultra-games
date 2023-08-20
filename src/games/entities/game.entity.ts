import { PublisherEntity } from 'src/publishers/entities/publisher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => PublisherEntity)
  @JoinColumn()
  publisher: PublisherEntity;

  @Column('text', { array: true, default: '{}' })
  tags: string[];

  @Column({ nullable: false, type: 'date' })
  releaseDate: Date;
}
