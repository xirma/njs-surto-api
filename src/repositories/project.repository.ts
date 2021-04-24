import { EnumOptions } from 'knex';
import { Page } from '../models/page';
import PaginationRepository from './pagination.repository';
import { queryBuilder } from '../core/database';
import { Project } from '../models/project';

export default class ProjectRepository {

    public static async create(name: string, category: any, description: string, image: string, user_id: number): Promise<number> {
        const [project_id] = await queryBuilder.insert({
            name: name,
            category: category,
            description: description,
            img: image,
            user_id
        }).into('Project');

        if (!project_id || project_id <= 0) {
            throw new Error('Error creating project');
        }

        return project_id;
    }

    public static async detail(project_id: number, user_id: string): Promise<Project> {
        const project = await queryBuilder
            .select('id', 'name', 'category', 'description', 'img', 'user_id')
            .from('Project')
            .where('id', '=', project_id)
            .first();

        if (!project || project >= 0 ) {
            throw new Error('Not found');
        } 

        if (project.user_id !== user_id) {
            throw new Error ('Access denied');
        }

        return project;
    }

    public static async byUser(user_id: number): Promise<Project[]> {
        const projects =  await queryBuilder
            .select()
            .from('Project')
            .where('User_id', '=', user_id)
            .limit(5);

        if (!projects || projects.length <= 0 ) {
            throw new Error('No projects for this user');
        }

        return projects;
    }

    public static async byEvent(event_id: string): Promise<Project[]> {
        console.log(event_id);
        const projects = await queryBuilder
            .select()
            .from('Placeholder')
            .where('Event_id', '=', event_id)
            .leftJoin('Project', 'id', 'Project_id');

        if (projects.length <= 0 ) {
            throw new Error('No projects enrolled in this event');
        }

        return projects;
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

    public static async all(page: number, limit: number, filter: any): Promise<Page> {
        const model = 'Project';
        const currentPage = await PaginationRepository.pagination(model, page, limit,  filter);
        

        if (currentPage.data.length <= 0 ) {
            throw new Error('No projects');
        }

        return currentPage;
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