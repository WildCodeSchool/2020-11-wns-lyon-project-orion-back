import {SignOptions} from 'jsonwebtoken';
import {User} from '../user/user.entity';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthPayloadModel} from './models/auth-payload.model';
import {AuthTokensModel} from './models/auth-tokens.model';
import {UserService} from '../user/user.service';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private config: ConfigService,
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async getPayload(token: string): Promise<AuthPayloadModel> {
        try { return await this.jwtService.verify(token);
        } catch (e) { throw new UnauthorizedException(e); }
    }

    async getTokens(user: User): Promise<AuthTokensModel> {
        const payload: AuthPayloadModel = this.userToPayload(user);
        const accessToken = await this.sign(payload, this.config.get<number>('JWT_ACCESS_LIMIT'));
        const refreshToken = await this.sign(payload, this.config.get<number>('JWT_REFRESH_LIMIT'));
        return {accessToken, refreshToken} as AuthTokensModel;
    }

    async getUser(payload: AuthPayloadModel): Promise<User> {
        return await this.userService.repository.findOne(payload.id);
    }

    private async sign(payload: AuthPayloadModel, expiresInMs: number): Promise<string> {
        const options: SignOptions = {expiresIn: expiresInMs / 1000};
        return this.jwtService.sign(payload, options);
    }

    private userToPayload(user: User): AuthPayloadModel {
        const {id, email, roles} = user;
        return {id, email, roles};
    }
}
