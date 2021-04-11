import { queryBuilder } from '../core/database';
import { Page } from '../models/page';

export default class PaginationRepository {
    public static async pagination (page: number, limit: number, model: string, filter: string): Promise<Page> {
        const pageSize = limit;
        const offset = (page - 1) * limit;      
        const nextPage = page + 1;
        const previousPage = page - 1;    
        
        const { totalRecords, data } = filter ? await this.filter(filter, offset,limit , model) : await this.all(offset, limit, model);
        const totalPages = Math.ceil(totalRecords / limit);

      return { totalRecords, totalPages, previousPage, nextPage, pageSize, data };
    }

    public static async all(offset: number, limit: number, model: string): Promise<any> {
        const query = queryBuilder.select().from(`${model}`);

        const totalRecords = query.clone().count;
        const data = query.clone().offset(offset).limit(limit);
        
        return { totalRecords, data };
    }

    public static async filter(filter: string, offset: number, limit: number, model: string): Promise<any> {
        const query = queryBuilder.select().from(`${model}`).where('name', 'like', `%${filter}%`).orWhere('description', 'like', `%${filter}%`);
        
        const totalRecords = query.clone().count;
        const data = query.clone().offset(offset).limit(limit);

        return { totalRecords, data };
    }

    
}