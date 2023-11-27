import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { AtGuard } from '@libs/gurads';
import { News } from './dto/news.dto';
import { HttpExceptionFilter } from '@libs/exceptions-handler/http-exception.filter';

@Controller('news')
@ApiTags('news')
@UseFilters(HttpExceptionFilter)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('get-news')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  async getNews(@Body() payload: News) {
    return await this.newsService.getNews(payload);
  }

  @Post('get-headlines')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  async getHeadlines() {
    return await this.newsService.getHeadlines();
  }
}
