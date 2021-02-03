import {} from "jasmine"
import { Scope } from './scope'



let o;
describe('Scope', () => {
    afterEach( () => {
        o = undefined;
    })

    it('should instantiate', () => {
        o = new Scope()
    })

    it('should load the project.json file in the current directory', () => {

        process.chdir('test-project');

        o = new Scope()

        expect(o.project.name).toEqual('Test');    

        process.chdir( '..' )

    })
})