import { Module } from '../../../../../../ts/api/src';
import { LibraryController } from './library.controller';


@Module({
    controllers: [
        LibraryController
    ]
})
export class LibraryModule {

}
