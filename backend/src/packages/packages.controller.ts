import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@libs/exceptions-handler/http-exception.filter';
import { PrismaClientExceptionFilter } from '@libs/prisma-client-exception/prisma-client-exception.filter';
import { AtGuard } from '@libs/gurads';

@Controller('packages')
@ApiTags('packages')
@UseFilters(PrismaClientExceptionFilter, HttpExceptionFilter)
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get('')
  @UseGuards(AtGuard)
  @ApiBearerAuth('JWT-auth')
  async getPackages() {
    return await this.packagesService.getPackages();
  }
}
