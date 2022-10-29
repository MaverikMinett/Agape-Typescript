import { Model } from "../../../ts/model/src/lib/decorators/model"
import { Field } from "../../../ts/model/src/lib/decorators/field"
import { View } from "../../../ts/model/src/lib/decorators/view"

@Model export class User {
    @Field id: string;

    @Field({ readable: false })
    username: string;

    @Field password: string;

    @Field lastLogin: Date;
}

export interface UserDetail extends Pick<User,'id'|'username'|'lastLogin'>{}
@View(User) export class UserDetail { }





@Model export class Event {
    @Field id: number;

    @Field({ length: 128 })
    name: string;

    @Field({ type: 'text' })
    description: string;

    @Field({ type: 'string', length: 64 })
    location_name: string = ""

    @Field({ type: 'string', length: 128})
    location_address: string = ""

    @Field({ type: 'string', length: 64})
    contact_email: string = ""

    @Field({ type: 'string', length: 32})
    contact_phone: string = ""
}


/**
 * Demonstrates that by default all properties from the model
 * will be available on the view
 */
export interface EventDetail extends Event{}
@View(Event) export class EventDetail { }

/**
 * Pick specific fields from the model to make available on the view
 */
export interface EventList extends Pick<Event,"id"|"name"|"description">{}
@View(Event,['id','name','description']) 
export class EventList { }


