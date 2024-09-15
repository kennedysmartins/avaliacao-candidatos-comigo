import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET as string;

if (!secret) {
  console.error('Secret key is not defined');
}

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string;
  const token = req.cookies?.token || (authHeader ? authHeader.replace('Bearer ', '') : undefined);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(400).json({ message: 'Invalid Token', error: err });
  }
};

export default verifyToken;
