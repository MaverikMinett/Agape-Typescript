import { Query } from "../../lib/sql/query/abstract";
import { SqlTable } from "../../lib/sql/table";


describe('Query', () => {

    class DerivedQuery extends Query {

    }

    it('should instantiate', () => {
        const t = new SqlTable('foo')
        const q = new DerivedQuery(t)
    })

})