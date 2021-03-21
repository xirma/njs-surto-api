import { Request, Response } from 'express';
import ProjectRepository from '../repositories/project.repository';

class UserController {

    public async createProject( req: Request, res: Response): Promise<Response> {
        const { decodedToken: { user_id }} = res.locals;

        try{
            const { name, category, description, image } = req.body;

            const projectId = await ProjectRepository.createProject(name, category, description, image, user_id);
            const project = await ProjectRepository.byId(projectId);

            return res.status(201).json(project);
        } catch (err) {
            return res.status(400).json({
                message: 'Bad Request',
                code: 400,
                error: err.message
            });
        }
    }

    public async userProjects( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async updateProject( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async projectDetail( req: Request, res: Response): Promise<Response> {
        const { projectId } = req.query;
        console.log(projectId);
        try{
            const project = await ProjectRepository.byId(1);

            return res.status(201).json(project);
        } catch (err) {
            return res.status(400).json({
                message: 'Bad Request',
                code: 400,
                error: err.message
            });
        }
    }

    public async activeEvents( req: Request, res: Response): Promise<Response> {
        return res.json();
    }

    public async eventInscription( req: Request, res: Response): Promise<Response> {
        return res.json();
    }
}

export default new UserController();