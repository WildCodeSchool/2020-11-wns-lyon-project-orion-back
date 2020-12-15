import {UserAgent} from '@commons/decorators/user-agent.decorator';
import {RemoteAddress} from '@commons/decorators/remote-address.decorator';
import {ConnectionService} from '@modules/connection/connection.service';
import {LoginOutput} from '@modules/public/outputs/login.output';
import {LoginInput} from '@modules/public/inputs/login.input';
import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UserService} from '@modules/user/user.service';
import {AuthService} from '@core/auth/auth.service';
import {BadRequestException} from '@nestjs/common';
import {compare} from '@commons/utils/password';
import {ConfigService} from '@nestjs/config';

@Resolver()
export class PublicResolver {

    constructor(
        readonly userService: UserService,
        readonly authService: AuthService,
        readonly configService: ConfigService,
        readonly connectionService: ConnectionService,
    ) {
    }

    @Mutation(() => LoginOutput)
    async login(
        @UserAgent() userAgent: string,
        @RemoteAddress() remoteAddress: string,
        @Args('input') input: LoginInput): Promise<LoginOutput> {

        // Vérification des inputs requis
        if (!input.email) throw new BadRequestException('Email is required');
        if (!input.password) throw new BadRequestException('Password is required');

        // Récupération de l'utilisateur via son email
        const user = await this.userService.findOne({email: input.email});
        if (!user) throw new BadRequestException('Invalid credentials');

        // Comparaison des mots de passe
        const match = await compare(input.password, user.password);
        if (!match) throw new BadRequestException('Invalid credentials');

        // Création des tokens
        const tokens = await this.authService.getTokens(user);
        const expiresIn = this.configService.get<number>('JWT_ACCESS_LIMIT');

        // Enregistrement de la connexion
        const refreshToken = tokens.refreshToken;
        const connectionData = {refreshToken, user, userAgent, remoteAddress};
        await this.connectionService.create(connectionData);

        // Envoi des résultats
        return {user, expiresIn, ...tokens};
    }
}
