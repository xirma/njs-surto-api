import { createHash } from 'crypto';
import { User } from '../models/user';
import { queryBuilder } from '../core/database';
import { sign } from 'jsonwebtoken';

export default class AuthRepository {

    public static  async attemptLogin( email: string, password: string): Promise<string> {
        password = createHash('sha256').update(password).digest('hex');

        const user: User = await queryBuilder
            .select()
            .from('User')
            .where('email', '=', email)
            .andWhere('password', '=', password)
            .first();   

        if (user) {
            const token = sign({
                exp: Math.floor(Date.now() / 1000) + ( 60 * 60 * 24 * 31),
                email: user.email,
                full_name: user.full_name,
                active: user.active,
                promo: user.promo,
                user_id: user.id     
            }, 'MyVerySecretKeyForSignedToken');

            return token;
        }

        throw new Error('Bad credentials');
    }

    public static async register(full_name: string, email: string, password: string,active: boolean, promo: boolean): Promise<number> {
        password = createHash('sha256').update(password).digest('hex');
        
        const [userId] = await queryBuilder.insert({    
            full_name,
            email, 
            password,
            active,
            promo   
        }).into('User');

        if(!userId || userId <= 0) {
            throw new Error('Problem registering user');
        }

        return userId;
    }
}