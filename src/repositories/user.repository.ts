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

}