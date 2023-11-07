import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../model/user/user.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    } 
}