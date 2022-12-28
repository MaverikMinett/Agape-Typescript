import { Model } from "../../../../../ts/model/src/lib/decorators/model"
import { Field } from "../../../../../ts/model/src/lib/decorators/field"
import { View } from "../../../../../ts/model/src/lib/decorators/view"

@Model export class User {
    @Field id: string;

    @Field({ readable: false, example: "ollietabooger" })
    username: string;

    @Field({ example: "JarHead333!" })
    password: string;

    @Field lastLogin: Date;
}

export interface UserDetail extends Pick<User,'id'|'username'|'lastLogin'>{};
@View(User, ['username','password','lastLogin']) export class UserDetail { }


export interface UserLogin extends Pick<User,'username'|'password'>{};
@View(User,['username','password']) export class UserLogin { }
