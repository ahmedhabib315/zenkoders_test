import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { format, sub } from 'date-fns';
import { News } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor() {}

  async getNews(data: News) {
    try {
      const date = format(sub(new Date(), { days: 6 }), 'yyyy-MM-dd');
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?language=en&sortBy=popularity${
          data.q
            ? '&q=' + data.q
            : data.category
              ? '&category=' + data.category
              : '&category=general'
        }&apiKey=${process.env.NEWS_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => err);

      if (response.status == 'ok') {
        return {
          status: true,
          message: 'Articles loaded successfully',
          data: response.articles,
        };
      } else {
        return {
          status: false,
          message: 'Some Error Occurred. Please try again later',
        };
      }
    } catch (error) {
      throw new Error('Internal Server Error Occurred.');
    }
  }

  async getHeadlines() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?pageSize=5&sources=bbc-news,the-verge&apiKey=${process.env.NEWS_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => err);

      if (response.status == 'ok') {
        return {
          status: true,
          message: 'Headlines loaded successfully',
          data: response.articles,
        };
      } else {
        return {
          status: false,
          message: 'Some Error Occurred. Please try again later',
        };
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
