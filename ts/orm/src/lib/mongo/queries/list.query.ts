import { Collection } from 'mongodb';
import { Class, inflate } from '../../../../../object/src';

export class ListQuery<T extends Class> {

    constructor( public model: T, public collection: Collection ) {

    }

    async exec( ): Promise<Array<Pick<InstanceType<T>, keyof InstanceType<T>>>> {
        const records = await this.collection.find({  }).toArray()
        for ( let record of records ) {
            record.id = record._id.toString()
            delete record._id
        }

        return records as any[]
    }

    async inflate( ): Promise<Array<InstanceType<T>>> {
        const record = await this.exec()
        return inflate<T>( [this.model], record )
    }
}