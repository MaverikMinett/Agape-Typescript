import {} from "jasmine"

import { NewDjangoProjectPrompt } from './new.prompt'

let p, t;
describe('NewDjangoProjectPrompt', () => {
    
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new NewDjangoProjectPrompt()
        expect(p).toBeTruthy()
    })


})


