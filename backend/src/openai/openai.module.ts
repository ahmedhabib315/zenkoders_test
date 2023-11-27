import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { PrismaService } from '@libs/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [OpenaiService, PrismaService, JwtService],
  controllers: [OpenaiController]
})
export class OpenaiModule {}
