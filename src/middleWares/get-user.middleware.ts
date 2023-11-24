import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      next();
      return;
    }
    try {
      const user = jwt.verify(authJwtToken, process.env.JWT_SECRET);

      if (user) {
        req['user'] = user;
      }
    } catch (err) {
      console.log('Error Handling authentication Jwt', err);
    }
    next();
  }
}
