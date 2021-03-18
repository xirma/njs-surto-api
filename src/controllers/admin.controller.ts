import { Request, Response } from 'express';

class AdminController {

    public async allProjects( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async projectsByEvent( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async projectsByUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async deleteProject( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async allEvents( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async eventDetail( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async createEvent( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async updateEvent( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async deleteEvent( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

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