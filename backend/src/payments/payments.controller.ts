import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AtGuard } from '@libs/gurads';
import { GetCurrentUserId } from '@libs/decorators';
import { Token } from './dto/payments.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from '@libs/prisma-client-exception/prisma-client-exception.filter';
import { HttpExceptionFilter } from '@libs/exceptions-handler/http-exception.filter';

@Controller('payments')
@ApiTags('user')
@UseFilters(PrismaClientExceptionFilter, HttpExceptionFilter)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('subscription')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  async subscription(@GetCurrentUserId() userId: number, @Body() data: Token) {
    return await this.paymentsService.subscription(userId, data);
  }
}
