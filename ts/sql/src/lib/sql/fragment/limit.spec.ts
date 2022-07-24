import { Limit } from "./limit"

describe('Limit', () => {

    let f:Limit


    beforeEach( () => {
        f = undefined
    })

    it('should instantiate', () => {
        f = new Limit(50)
        expect(f).toBeTruthy()
    })

    it('should produce the expected sql', () => {
        f = new Limit(50)
        expect(f.sql()).toEqual('LIMIT 50')
    })


})