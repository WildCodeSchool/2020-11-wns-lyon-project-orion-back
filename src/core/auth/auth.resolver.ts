import {UserAgent} from '../decorators/user-agent.decorator';
import {RemoteAddress} from '../decorators/remote-address.decorator';
import {BadRequestException, UnauthorizedException} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {RefreshOutput} from '@core/auth/outputs/refresh.output';
import {LoginOutput} from '@core/auth/outputs/login.output';
import {LoginInput} from '@core/auth/inputs/login.input';
import {UserService} from '../../api/user/user.service';
import {compare} from '@shared/utils/password';
import {ConfigService} from '@nestjs/config';
import {AuthService} from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        readonly authService: AuthService,
        readonly userService: UserService,
        readonly configService: ConfigService,
    ) {}

    @Query(() => Boolean)
    async emailExists(@Args('email') email: string): Promise<boolean> {
        if (!email) throw new BadRequestException('Email is required');
        return !!(await this.userService.repository.findOne({email}));
    }

    @Mutation(() => LoginOutput)
    async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
        // Vérification des inputs requis
        if (!input.email) throw new BadRequestException('Email is required');
        if (!input.password)
            throw new BadRequestException('Password is required');

        // Récupération de l'utilisateur via son email
        const user = await this.userService.repository.findOne({
            email: input.email,
        });
        if (!user) throw new BadRequestException('Invalid credentials');

        // Comparaison des mots de passe
        const match = await compare(input.password, user.password);
        if (!match) throw new BadRequestException('Invalid credentials');

        // Création des tokens
        const tokens = await this.authService.getTokens(user);
        const expiresIn = this.configService.get<number>('JWT_ACCESS_LIMIT');

        // Envoi des résultats
        return {user, expiresIn, ...tokens};
    }

    @Mutation(() => RefreshOutput)
    async refresh(
        @Args('refreshToken') refreshToken: string,
    ): Promise<RefreshOutput> {
        // Vérification des inputs requis
        if (!refreshToken)
            throw new BadRequestException('Refresh token is required');

        // Vérification de la validité du token et récupération de l'utilisateur
        const payload = await this.authService.getPayload(refreshToken);
        const user = await this.authService.getUser(payload);
        if (!user) throw new UnauthorizedException();

        // Création des tokens
        const tokens = await this.authService.getTokens(user);
        const expiresIn = this.configService.get<number>('JWT_ACCESS_LIMIT');

        // Envoi des résultats
        return {expiresIn, ...tokens};
    }
}
