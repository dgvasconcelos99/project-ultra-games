import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PublishersModule } from './publishers/publishers.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NODE_DATABASE_HOST,
      port: Number(process.env.NODE_DATABASE_PORT),
      database: process.env.NODE_DATABASE_NAME,
      username: process.env.NODE_DATABASE_USERNAME,
      password: process.env.NODE_DATABASE_PASSWORD,
      synchronize: true,
      entities: [__dirname + './**/*.entity{.js,.ts}'],
    }),
    PublishersModule,
    GamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
