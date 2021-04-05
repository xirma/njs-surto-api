import { User } from '../models/user';
import { queryBuilder } from '../core/database';


export default class UsersRepository {
    
    public static async byId(id: number): Promise<User> {
        return queryBuilder
            .select()
            .from('User')
            .where('id', '=', id)
            .first();
    }

    public static async all(filter: string): Promise<User[]> {
        if(filter) {
            const filteredUsers = await this.filter(filter);

            if (!filteredUsers || filteredUsers.length <= 0 ) {
                throw new Error('No filtered users');
            }
        return filteredUsers;
        }

        const users = await queryBuilder
                .select()
                .from('User');

        if(!users || users.length <= 0) {
            throw new Error('No events');
        }

        return users;
    }

    public static async filter(filter: string): Promise<User[]> {
        return queryBuilder
        .select()
        .from('User')
        .where('full_name', 'like', `%${filter}%`)
        .orWhere('email', 'like', `%${filter}%`);
    }

    public static async detail(id: string): Promise<User> {
        const contactDetail = await queryBuilder
            .select()
            .from('User')
            .where('id', '=', id)
            .first();

        if(!contactDetail || contactDetail.length <= 0) {
            throw new Error('Not found');
        }
        
        return contactDetail;
        
    }

    public static async update(user_id: string,full_name: string, email: string): Promise<number> {
        const user = await queryBuilder
            .update({
                full_name: full_name,
                email: email
            }).where('id', '=', user_id)
            .into('User');

        if(!user || user <= 0) {
            throw new Error('Not found');
        }

        return user;
    }

    public static async delete(user_id: string): Promise<void> {
        const del = await queryBuilder
                    .select()
                    .from('User')
                    .where('id', '=', user_id)
                    .delete();

            if (!del || del <= 0 ) {
                throw new Error('Not found');
            }
    }

}