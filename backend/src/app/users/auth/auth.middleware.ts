import {Injectable, NestMiddleware} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      req['user'] = null;
      next();
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const decode = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      req['user'] = decode.id;
      next();
    } catch {
      req['user'] = null;
      next();
      return;
    }
  }
}
