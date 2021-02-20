import {} from "jasmine"
import { AuthorDescriptor } from './descriptors'



let d;
describe('AuthorDescriptor', () => {
    afterEach( () => {
        d = undefined;
    })

    it('should instantiate', () => {
        d = new AuthorDescriptor()
    })
})