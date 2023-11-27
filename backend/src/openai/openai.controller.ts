import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { AtGuard } from '@libs/gurads';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OpenAISummary } from './dto/openai.dto';
import { HttpExceptionFilter } from '@libs/exceptions-handler/http-exception.filter';

@Controller('openai')
@ApiTags('openai')
@UseFilters(HttpExceptionFilter)
export class OpenaiController {
  constructor(private readonly openAiService: OpenaiService) {}

  @Post('summary')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  async getSummary(@Body() description: OpenAISummary) {
    return await this.openAiService.getSummary(description);
  }
}
