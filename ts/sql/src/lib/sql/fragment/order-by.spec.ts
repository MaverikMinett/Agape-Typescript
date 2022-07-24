import { SqlColumn } from "../column"
import { OrderBy } from "./order-by"


fdescribe('OrderBy', () => {

    let f:OrderBy
    let c:SqlColumn

    beforeEach( () => {
        [c,f] = [undefined, undefined]
    })

    it('should instantiate', () => {
        c = new SqlColumn('foo')
        f = new OrderBy(c)
        expect(f).toBeTruthy()
    })

    it('should produce the expected sql', () => {
        c = new SqlColumn('foo')
        f = new OrderBy(c)
        expect(f.sql()).toEqual('foo ASC')
    })

    it('should do descending', () => {
        c = new SqlColumn('foo')
        f = new OrderBy(c, 'desc')
        expect(f.sql()).toEqual('foo DESC')
    })
})