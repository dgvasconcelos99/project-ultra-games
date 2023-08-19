import { PublisherEntity } from 'src/publishers/entities/publisher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  price: number;

  @OneToOne(() => PublisherEntity)
  @JoinColumn()
  publisher: PublisherEntity;

  @Column()
  tags: string[];

  @Column({ nullable: false })
  releaseDate: Date;
}
