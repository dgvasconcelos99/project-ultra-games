import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PublishersModule } from './publishers/publishers.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.develop',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NODE_DATABASE_HOST,
      port: parseInt(<string>process.env.NODE_DATABASE_PORT),
      database: process.env.NODE_DATABASE_NAME,
      username: process.env.NODE_DATABASE_USERNAME,
      password: process.env.NODE_DATABASE_PASSWORD,
      entities: [],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    PublishersModule,
    GamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
