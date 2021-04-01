import { EnumOptions } from 'knex';
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

    public static async byId(project_id: number): Promise<Project> {
        const project = queryBuilder
            .select('id', 'name', 'category', 'description', 'img', 'user_id')
            .from('Project')
            .where('id', '=', project_id)
            .first();

        return project;
    }

    public static async projectsByUser(user_id: number): Promise<Project[]> {
        return queryBuilder
            .select()
            .from('Project')
            .where('User_id', '=', user_id)
            .limit(5);
    }

    public static async updateProject( id: number, name: string,category: EnumOptions, description: string, image: string): Promise<number> {
        return queryBuilder
            .update({name: name, category: category, description: description, img: image})
            .from('Project')
            .where('id', '=', id);
    }

    public static async all(): Promise<string[]> {
        return queryBuilder 
            .select()
            .from('Project');
    }

    public static async delete(project_id: number ) {
        try {
            return queryBuilder
                .select()
                .from('Project')
                .where('id', '=', project_id)
                .delete();
        } catch (Error) {
            throw new Error('Not Found');
        }

    }
}