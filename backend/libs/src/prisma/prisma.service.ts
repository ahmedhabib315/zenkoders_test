import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnApplicationShutdown
{
  async onApplicationShutdown(signal?: string) {
    // Handle application shutdown here, e.g., close the Prisma client.
    await this.$disconnect();
  }
}
