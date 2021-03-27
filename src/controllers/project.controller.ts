import { Request, Response } from 'express';
import ProjectRepository from '../repositories/project.repository';

class ProjectController {

    public async createProject( req: Request, res: Response): Promise<Response> {
        const { decodedToken: { user_id }} = res.locals;

        try{
            const { name, category, description, image } = req.body;

            const projectId = await ProjectRepository.createProject(name, category, description, image, user_id);
            const project = await ProjectRepository.byId(projectId);

            return res.status(201).json(project);
        } catch (err) {
            return res.status(204).json({
                message: 'No Content',
                code: 400,
                error: err.message
            });
        }
    }

    public async userProjects( req: Request, res: Response): Promise<Response> {
        const { decodedToken: { user_id}} = res.locals;
        
        try {
            const projects = await ProjectRepository.projectsByUser(user_id);
            
            return res.json(projects);    
        } catch (err) {
            return res.status(204).json({
                message: 'No Content',
                code: 204,
                error: err.message
            });
        }

    }

    public async updateProject( req: Request, res: Response): Promise<Response> {
        const { decodedToken: {user_id}} = res.locals;
        const { project_id } = req.params;

        try {
            const { id, name, category, description, image } = req.body;

            const update = await ProjectRepository.updateProject(id, name, category, description, image);
            return res.json(update);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }

        
    }

    public async projectDetail( req: Request, res: Response): Promise<Response> {
        const { decodedToken: {user_id}} = res.locals;
        const { project_id } = req.params;
        const project_number = Number(project_id);
        
        try {
            const project = await ProjectRepository.byId(project_number);
            console.log(project);
            if(!project){
                throw new Error ('No Content');
            } 
            if (project.user_id !== user_id) {
                throw new Error ('Access Denied');
                
            }

            return res.status(201).json(project);
        } catch (Error) {
            return res.status(204).json({
                message: 'No Content',
                code: 204,
                error: Error.message
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

export default new ProjectController();