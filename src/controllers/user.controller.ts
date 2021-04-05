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
        const { user_id } = req.params;

        try {
            const user = await UsersRepository.detail(user_id);

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
        const { user_id } = req.params;
        const { full_name, email} = req.body;

        try {
            const user = await UsersRepository.update(user_id, full_name, email);
            return res.json(user);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });  
        }    
    }

    public async deleteUser( req: Request, res: Response): Promise<Response> {
        const { user_id } = req.params;

        try {
            await UsersRepository.delete(user_id);

            return res.json('User deleted');
        }catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
        
    }
}

export default new AdminController();