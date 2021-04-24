import { queryBuilder } from '../core/database';
import { Page } from '../models/page';

export default class PaginationRepository {
    public static async pagination (model: string, page?: number, limit?: number, filter?: string): Promise<Page> {
        const pageSize = limit? limit : 5;
        const currentPage = page? page : 1;

        const offset = (currentPage - 1) * pageSize;      
        const nextPage = currentPage + 1;
        const previousPage = currentPage - 1;    
        const totalRecords = await this.totalRecords(model, filter);
        const data  = filter ? await this.filter(filter, offset, pageSize , model) : await this.all(offset, pageSize, model);
        const totalPages = Math.ceil(totalRecords / pageSize);

        if(!data || data <= 0) {
            throw new Error('No data');
        }
        
    
      return { totalRecords, totalPages, previousPage, nextPage, pageSize, data };
    }

    public static async all(offset: number, limit: number, model: string): Promise<any> {
        const query = queryBuilder.select().from(`${model}`);
        const data = await query.clone().offset(offset).limit(limit);
    
        return data;
    }

    public static async filter(filter: string, offset: number, limit: number, model: string): Promise<any> {
        const query = queryBuilder.select().from(`${model}`).where('name', 'like', `%${filter}%`).orWhere('description', 'like', `%${filter}%`);  
        const data = await query.clone().offset(offset).limit(limit);
        
        return data ;
    }

    public static async totalRecords(model: string, filter?: string): Promise<number> {
        const query = queryBuilder.select().from(`${model}`);
        const filteredQuery = query.clone().where('name', 'like', `%${filter}%`).orWhere('description', 'like', `%${filter}%`);
        
        const total = filter ? filteredQuery : query;
        const totalNumber = await total.count();
              
        return Number(totalNumber[0]['count(*)']);    
    }

    
}