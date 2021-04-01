import { Request, Response } from 'express';

class AdminController {

    
    

    public async allUsers( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async updateUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async deleteUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }
}

export default new AdminController();