import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from '@libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [NewsService, PrismaService, JwtService],
  controllers: [NewsController]
})
export class NewsModule {}
