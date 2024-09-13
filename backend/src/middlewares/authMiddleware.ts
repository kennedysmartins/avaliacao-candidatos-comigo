// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JSON_SECRET as string; 

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token', error: err });
  }
};

export default verifyToken;
