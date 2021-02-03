import {} from "jasmine"
import { AuthorDescriptor, ProjectDescriptor } from './descriptors'



let d;
describe('ProjectDescriptor', () => {
    afterEach( () => {
        d = undefined;
    })

    it('should instantiate', () => {
        d = new ProjectDescriptor()
    })
})


describe('AuthorDescriptor', () => {
    afterEach( () => {
        d = undefined;
    })

    it('should instantiate', () => {
        d = new AuthorDescriptor()
    })
})