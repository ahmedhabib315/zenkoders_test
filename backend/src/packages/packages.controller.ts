import { Controller, Get, UseFilters } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@libs/exceptions-handler/http-exception.filter';
import { PrismaClientExceptionFilter } from '@libs/prisma-client-exception/prisma-client-exception.filter';

@Controller('packages')
@ApiTags('packages')
@UseFilters(PrismaClientExceptionFilter, HttpExceptionFilter)
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get('')
  async getPackages() {
    return await this.packagesService.getPackages();
  }
}
