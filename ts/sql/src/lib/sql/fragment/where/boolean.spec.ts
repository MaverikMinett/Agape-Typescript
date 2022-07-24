import { WhereBoolean } from "./boolean"

describe('WhereBoolean', () => {

    let s:WhereBoolean

    beforeEach( () => {
        [s] = [undefined]
    })

    describe('and', () => {
        it('should instantiate', () => {
            s = new WhereBoolean('and')
            expect(s).toBeTruthy()
        })
        it('should print sql', () => {
            s = new WhereBoolean('and')
            expect(s.sql()).toEqual('AND')
        })
    })    
    describe('not', () => {
        it('should instantiate', () => {
            s = new WhereBoolean('not')
            expect(s).toBeTruthy()
        })
        it('should print sql', () => {
            s = new WhereBoolean('not')
            expect(s.sql()).toEqual('NOT')
        })
    })
    describe('or', () => {
        it('should instantiate', () => {
            s = new WhereBoolean('or')
            expect(s).toBeTruthy()
        })
        it('should print sql', () => {
            s = new WhereBoolean('or')
            expect(s.sql()).toEqual('OR')
        })
    })
    describe('xor', () => {
        it('should instantiate', () => {
            s = new WhereBoolean('xor')
            expect(s).toBeTruthy()
        })
        it('should print sql', () => {
            s = new WhereBoolean('xor')
            expect(s.sql()).toEqual('XOR')
        })
    })

})