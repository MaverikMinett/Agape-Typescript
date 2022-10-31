import { Controller, Description, Post, Body, Request, Status } from '../../../../../ts/api/src'
import { UserLogin } from './user.model';
import { AuthBackend } from './auth.backend';
import { InvalidCredentialsError } from './auth.errors';

@Controller() export class AuthController  {

    constructor( private auth: AuthBackend ) { }

    @Post('login')
    @Description('Authenticate a user')
    @Body(UserLogin, 'Username and password')
    @Status(200)
    async login( request: Request ) {
        const { username, password } = request.body

        const user = await this.auth.authenticate( username, password )

        if ( ! user ) throw new InvalidCredentialsError()

        const token = this.auth.createJwt( user )

        return token
    }

}
