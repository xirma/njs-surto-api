import { Request, Response } from 'express';

class AuthController {

    public async login( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async signUp( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async profile( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async activateUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }
}

export default new AuthController();