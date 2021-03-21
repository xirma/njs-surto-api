import { User } from '../models/user';
import { queryBuilder } from '../core/database';
import { UserInfo } from '../models/user-info';

export default class UsersRepository {
    
    public static async byId(id: number): Promise<User> {
        return queryBuilder
            .select()
            .from('User')
            .where('id', '=', id)
            .first();
    }

    public static async  userInfo(userId: number): Promise<UserInfo> {
      return queryBuilder
        .select('full_name', 'email')
        .from('User')
        .where('id', '=', userId)
        .first();
    }

}