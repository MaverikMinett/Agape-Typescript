import { Field, Model, View} from "../../../ts/model";

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

export interface EventList extends Event{};
@View(Event) export class EventDetail { }

export interface EventList extends Pick<Event,"id"|"name"|"description">{};
@View(Event,['id','name','description']) 
export class EventList { }


