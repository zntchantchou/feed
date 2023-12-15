import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers?.authorization) {
      console.log('HEADERS AT ERROR: ', req.headers);
      return res.status(401).json({ status: 'Unauthorized' });
    }
    try {
      const auth = await getAuth();
      // console.log('PLAIN TOKEN : --- \n');
      console.log('PLAIN HEADERS : --- \n');
      // console.log(req.headers.token, ' \n');
      console.log(req.headers.authorization, ' \n');
      let token = req?.headers?.authorization.substring(7);
      const decodedToken = await auth.verifyIdToken(token);
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
