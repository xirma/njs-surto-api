import { Request, Response } from 'express';
import UsersRepository from '../repositories/user.repository';

class AdminController {

    
    

    public async allUsers( req: Request, res: Response): Promise<Response> {
        const { filter, id } = req.params;

        try { 
            
           const users = await UsersRepository.all(filter);

           return res.json(users);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
    }

    public async userDetail (req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const user = await UsersRepository.detail(id);

            return res.json(user);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
    }

    public async updateUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async deleteUser( req: Request, res: Response): Promise<Response> {
        return res.json();
    }
}

export default new AdminController();