import  { Offset } from "./offset"

fdescribe('Offset', () => {

    let f:Offset

    beforeEach( () => {
        f = undefined
    })

    it('should instantiate', () => {
        f = new Offset(5)
        expect(f).toBeTruthy()
    })

    it('should produce the expected sql', () => {
        f = new Offset(5)
        expect(f.sql()).toEqual('OFFSET 5')
    })


})