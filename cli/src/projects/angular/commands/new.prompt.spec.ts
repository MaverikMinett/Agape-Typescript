import {} from "jasmine"

import { NewAngularProjectPrompt } from './new.prompt'

let p, t;
describe('NewAngularProjectPrompt', () => {
    
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new NewAngularProjectPrompt()
        expect(p).toBeTruthy()
    })


})


