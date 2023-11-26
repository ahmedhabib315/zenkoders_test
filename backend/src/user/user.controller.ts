import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Signin, Signup } from './dto/auth.dto';
import { Response } from 'src/type/response.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from '@libs/prisma-client-exception/prisma-client-exception.filter';
import { HttpExceptionFilter } from '@libs/exceptions-handler/http-exception.filter';
import { AtGuard, RtGuard } from '@libs/gurads';
import { GetCurrentUser, GetCurrentUserId } from '@libs/decorators';

@Controller('user')
@ApiTags('user')
@UseFilters(PrismaClientExceptionFilter, HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signuplocal(@Body() createUserDto: Signup): Promise<Response> {
    return await this.userService.signupLocal(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signinLocal(@Body() loginDto: Signin): Promise<Response> {
    return await this.userService.signinLocal(loginDto);
  }

  @Post('refresh-token')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.userService.refreshToken(userId, refreshToken);
  }

  @Post('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  async logout(@GetCurrentUserId() user_id: number) {
    return await this.userService.logout(user_id);
  }
}
