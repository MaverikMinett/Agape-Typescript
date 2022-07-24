# @agape/sql

SQL Generation

## Synopsis

```

var q = new SelectQuery()
                .from('table')
                .fields('')

sql.table('foo')
    .select()
    .fields()
    .where()
    .and()
    .groupStart()
        .where()
        .or()
    .groupEnd()

sql.table('foo')
    .select(all)
    .where('bar', '=', 6)
    .and
    .not
    .where('bar', '=', 77)

sql.table('foo')
    .select(all)
    .where('bar', '=', 6)
    .and()
    .not()
    .where('bar', '=', 77)

sql.table('foo')
    .select(all)
    .where('bar', '=', 6)
    .not('bar', '=', 77)

```

## Author

Maverik Minett  maverik.minett@gmail.com


## Copyright

© 2022 Maverik Apollo Minett


## License

MIT
