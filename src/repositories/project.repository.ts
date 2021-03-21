import { queryBuilder } from '../core/database';
import { Project } from '../models/project';

export default class ProjectRepository {

    public static async createProject(name: string, category: any, description: string, image: string, user_id: number): Promise<number> {
        const [projectId] = await queryBuilder.insert({
            name: name,
            category: category,
            description: description,
            img: image,
            user_id
        }).into('Project');

        if (!projectId || projectId <= 0) {
            throw new Error('Error creating project');
        }

        return projectId;
    }

    public static async byId(projectId: number): Promise<Project> {
        return queryBuilder
            .select('id', 'name', 'category', 'description', 'img', 'user_id')
            .from('Project')
            .where('id', '=', projectId)
            .first();
    }
}