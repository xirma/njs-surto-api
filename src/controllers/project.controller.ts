import { Request, Response } from 'express';
import ProjectRepository from '../repositories/project.repository';

class ProjectController {

    public async createProject( req: Request, res: Response): Promise<Response> {
        const { decodedToken: { user_id }} = res.locals;

        try{
            const { name, category, description, image } = req.body;

            const id = await ProjectRepository.create(name, category, description, image, user_id);
            const project = await ProjectRepository.detail(id, user_id);

            return res.status(201).json(project);
        } catch (Error) {
            return res.status(400).json({
                message: 'Bad Request',
                code: 400,
                error: Error.message
            });
        }
    }

    public async userProjects( req: Request, res: Response): Promise<Response> {
        const { decodedToken: { user_id}} = res.locals;
        console.log('userProjects');
        
        try {
            const projects = await ProjectRepository.byUser(user_id);
            
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
        const id = Number(project_id);
        try {
            const { name, category, description, image } = req.body;

            const update = await ProjectRepository.update(id, name, category, description, image, user_id);
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
            const project = await ProjectRepository.detail(project_number, user_id);

            return res.status(201).json(project);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
    }


    // --------------------------------------------- //
    // -------------- ADMIN PATHS ------------------ //
    // --------------------------------------------- //

    public async allProjects( req: Request, res: Response): Promise<Response> {
        const { page, limit, filter } = req.params;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        try {
            const page = await ProjectRepository.projectsPage(pageNumber, limitNumber, filter);
            return res.json(page);
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }

    }

    public async projectsByEvent( req: Request, res: Response): Promise<Response> {
        // const event_id = req.params;
        // const id = Number(event_id);

        // try {
        //     const projects = await ProjectRepository.byEvent(id);

        //     return projects;
        // } catch (Error) {
        //     return res.status(404).json({
        //         message: 'Not Found',
        //         code: 404,
        //         error: Error.message
        //     });
        // }
        return res.json();
    }

    public async projectsByUser( req: Request, res: Response): Promise<Response> {
        const { user_id } = req.params;
        const id = Number(user_id);

        try {
            const projects = await ProjectRepository.byUser(id);
            
            return res.json(projects);    
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        } 
    }

    public async deleteProject( req: Request, res: Response): Promise<Response> {
        const { project_id } = req.params;
        const id = Number(project_id);
        
        try{
            await ProjectRepository.delete(id);
            return res.json('Project deleted');
        } catch (Error) {
            return res.status(404).json({
                message: 'Not Found',
                code: 404,
                error: Error.message
            });
        }
    }


}

export default new ProjectController();