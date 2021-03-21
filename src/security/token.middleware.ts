import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default class TokenMiddleware {

    static allowedPaths: string[] = [
        '/',
        '/api/auth/login',
        '/api/auth/register'
    ];

    public static async tokenVerify (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        if (TokenMiddleware.allowedPaths.includes(req.path)) {
            return next();
        }

        if (!req.headers.authorization) {
            return res.status(403).json({
                code: 403,
                message: 'No credentials sent'
            });
        }

        try {
            const token = req.headers.authorization.split('Bearer ')[1];
            res.locals.decodedToken = verify(token, 'MyVerySecretKeyForSignedToken');

            return next();
        } catch (err) {
            return res.status(403).json({
                code: 403,
                message: 'Invalid token',
                error: err.message
            });
        }
    }
}