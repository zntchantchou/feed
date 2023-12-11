import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers?.token) {
      console.log('HEADERS AT ERROR: ', req.headers);
      return res.status(401).json({ status: 'Unauthorized' });
    }
    try {
      const auth = await getAuth();
      const decodedToken = await auth.verifyIdToken(
        req.headers.token as string,
      );
      // @ts-ignore
      req.userId = decodedToken?.uid;
      console.log('[TokenMiddleware] decoded uid: ', decodedToken.uid);
      next();
    } catch (e) {
      console.log('HEADERS AT ERROR: ', req.headers);
      return res.status(401).json({ status: 'Unauthorized' });
    }
  }
}
