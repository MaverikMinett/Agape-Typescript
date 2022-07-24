import { WhereSubgroupEnd } from "./subgroup-end"

describe('WhereSubgroupEnd', () => {

    let s:WhereSubgroupEnd

    beforeEach( () => {
        [s] = [undefined]
    })

    describe('and', () => {
        it('should instantiate', () => {
            s = new WhereSubgroupEnd()
            expect(s).toBeTruthy()
        })
        it('should print sql', () => {
            s = new WhereSubgroupEnd()
            expect(s.sql()).toEqual(')')
        })
    })   
    
})