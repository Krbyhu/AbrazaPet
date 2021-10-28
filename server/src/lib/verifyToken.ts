import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    correo: string;
    iat: number;
    exp: number;
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('auth-token');
      if (!token) {
        return res.status(401).json('Acceso denegado');
      };
      jwt.verify(token, process.env.TOKEN_SECRET || 'TOKENSECRET') as IPayload;
      next();
    } catch (error) {
      return res.status(401).json('Acceso denegado. Token expirado');
    }
};