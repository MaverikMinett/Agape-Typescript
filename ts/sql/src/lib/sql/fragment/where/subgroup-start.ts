import { Sql } from "../../abstract";

export class WhereSubgroupStart extends Sql {
    sql() {
        return '('
    }
}
