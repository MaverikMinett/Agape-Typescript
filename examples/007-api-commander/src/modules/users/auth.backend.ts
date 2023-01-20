import { Interface } from '../../../../../ts/object/src'
import { Backend } from '../../../../../ts/api/src'
import { User } from './user.model'


@Backend() export class AuthBackend {

    async authenticate( username: string, password: string ) {
        const user = new User()
        return user
        // const user = await orm.lookup( User, { username } )
        // if ( ! user ) return
        // return password === user.password ? user : undefined;
    }

    async createJwt( user: Interface<User> ) {
        return { jwt: 'you-are-logged-in' }
    }

}
