import { EnumOptions } from 'knex';
import { queryBuilder } from '../core/database';
import { Project } from '../models/project';

export default class ProjectRepository {

    public static async create(name: string, category: any, description: string, image: string, user_id: number): Promise<number> {
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

    public static async update( id: number, name: string,category: EnumOptions, description: string, image: string, user_id: number): Promise<number> {
        const projectId = await queryBuilder
            .update({name: name, category: category, description: description, img: image})
            .where('id', '=', id)
            .andWhere('User_id', '=', user_id)
            .into('Project');

        if (!projectId || projectId <= 0) {
            throw new Error('Error updating project');
        }

        return projectId;
    }

    public static async all(): Promise<string[]> {
        return queryBuilder 
            .select()
            .from('Project');
    }

    public static async delete(project_id: number ):Promise<void> {
        const del = await queryBuilder
            .select()
            .from('Project')
            .where('id', '=', project_id)
            .delete();
        
        if (!del || del <= 0 ) {
            throw new Error('Not Found');
        }    
    }
}