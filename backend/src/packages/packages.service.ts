import { PrismaService } from '@libs/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'src/type/response.type';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async getPackages(): Promise<Response> {
    const packages = await this.prisma.packages.findMany();

    return {
      status: true,
      message: 'Packages loaded successfully',
      data: packages,
    };
  }
}
