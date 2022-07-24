import { WhereSubgroupStart } from "./subgroup-start"

describe('WhereSubgroupStart', () => {

    let s:WhereSubgroupStart

    beforeEach( () => {
        [s] = [undefined]
    })

    describe('and', () => {
        it('should instantiate', () => {
            s = new WhereSubgroupStart()
            expect(s).toBeTruthy()
        })
        it('should print sql', () => {
            s = new WhereSubgroupStart()
            expect(s.sql()).toEqual('(')
        })
    })   
})