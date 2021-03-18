import { Request, Response } from 'express';

class UserController {

    public async createProject( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async userProjects( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async updateProject( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async projectDetail( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async activeEvents( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async eventInscription( req: Request, res: Response): Promise<Response> {
        return res.json();
    }
}

export default new UserController();