import { ApiController, Controller, Description, Post, Body, Status } from '../../../../../ts/api/src'
import { UserLogin } from './user.model';

@Controller() export class AuthController extends ApiController {





    @Post('login')
    @Description('Authenticate a user')
    @Body(UserLogin, 'Username and password')
    @Status(200)
    login() {

    }

}
