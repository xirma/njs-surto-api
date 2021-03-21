import { Request, Response } from 'express';
import AuthRepository from '../repositories/auth.repository';

class AuthController {

    public async login( req: Request, res: Response): Promise<Response> {
        try{
            const { email, password } = req.body;
            const token = await AuthRepository.attemptLogin(email, password);

            return res.json({ token });
        } catch (err) {
            return res.status(401).json({
                message: 'Unauthorized',
                code: 401,
                error: err.message
            });
        }
    }

    public async signUp( req: Request, res: Response): Promise<Response> {
        try{
            const { full_name, email, password, active, promo } = req.body;

            await AuthRepository.register(full_name, email, password, active, promo );

           
            const token = await AuthRepository.attemptLogin(email, password);

            return res.json({ token });
        } catch (err) {
            return res.status(400).json({
                message: 'Bad Request',
                code: 400,
                error: err.message
            });
        }
    }

    public async profile( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async activateUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }
}

export default new AuthController();