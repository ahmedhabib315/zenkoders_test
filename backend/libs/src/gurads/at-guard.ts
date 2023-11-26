import { PrismaService } from '@libs/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtServ: JwtService,
    private prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const { authorization }: any = request.headers;

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException();
    }

    const authToken = authorization.replace(/bearer/gim, '').trim();

    try {
      const payload = this.jwtServ.verify(authToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      const user = await this.getUser(payload.sub, payload.hash);
      if (user) {
        return super.canActivate(context);
      } else {
        throw new UnauthorizedException('User token is expired');
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async getUser(id: number, hash) {
    return await this.prisma.users.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            hash: hash,
          },
        ],
      },
    });
  }
}
