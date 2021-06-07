import {} from "jasmine"

import { InitSandboxPrompt } from './init.prompt'

let p, t;
describe('InitSandboxPrompt', () => {
    
    afterEach( () => {
        p = undefined;
    })

    it('should instantiate', () => {
        p = new InitSandboxPrompt()
        expect(p).toBeTruthy()
    })


})


