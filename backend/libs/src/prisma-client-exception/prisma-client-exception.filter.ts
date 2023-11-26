import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { isArray } from 'class-validator';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception;

    switch (exception.code) {
      case 'P2002':
        response.status(HttpStatus.CONFLICT).json({
          status: false,
          statusCode: HttpStatus.CONFLICT,
          message: `${
            isArray(message.meta.target)
              ? message.meta.target[0]
              : message.meta.target
          } already exists`,
          data: {},
        });
        break;
      default:
        super.catch(exception, host);
    }
  }
}
