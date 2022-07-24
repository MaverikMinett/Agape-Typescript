

export type StandardComparisonOperator = '='|'='|'!='|'<'|'<='|'=>'|'>';
export type ExtendedComparisonOperator = 'between'|'not between'|'in'|'not in'|'like'|'not like';
export type ComparisonOperator = StandardComparisonOperator|ExtendedComparisonOperator;
export type BooleanOperator = 'and'|'not'|'or'|'xor';

export type OrderByDirection = 'asc'|'desc';
