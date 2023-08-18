import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Document } from 'mongoose';

export type PublisherDocument = PublisherEntity & Document;

@Entity({ name: 'publishers' })
export class PublisherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  siret: number;

  @Column({ nullable: false })
  phone: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
