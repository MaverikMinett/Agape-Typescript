import { Class } from '@agape/object';

export abstract class Database {

    abstract collection( model: Class )

}