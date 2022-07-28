import * as sqlite3 from 'sqlite3';
import sql from '../../lib/sql';


describe('SQLite3 Integration', () => {

    let db:sqlite3.Database

    beforeEach( () => {
        db = new sqlite3.Database(':memory:');
    })

    afterEach( () => {
        db.close();
    })

    describe('select', () => {
        beforeEach( () => {
            db.serialize(() => {
                db.run("CREATE TABLE lorem (info VARCHAR(10))");
                const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                for (let i = 0; i < 10; i++) {
                    stmt.run("Ipsum " + i);
                }
                stmt.finalize();
            })
        })
        it('should select the rows', () => {
            db.serialize(() => {
                db.all( sql.table('lorem').select('info').sql(), (err, rows) => {
                    expect(rows.length).toBe(10)
                    for (let i = 0; i < 10; i++) {
                        expect(rows[i].info).toBe("Ipsum " + i)
                    }
                });
            })
        })
        it('should select rows with a where clause', () => {
            db.serialize( () => {
                db.all( 
                    sql.table('lorem').select('info').where('info','=','?').sql(),
                    "Ipsum 1",
                    (err, rows) => {
                        expect(rows.length).toBe(1)
                        expect(rows[0].info).toBe("Ipsum " + 1)
                    }
                )
            })
        })
    })

    describe('insert', () => {
        beforeEach( () => {
            db.run("CREATE TABLE lorem ( id INT(11), foo VARCHAR(128) )");
        })
        it('should insert the rows', () => {
            db.serialize( () => {
                const stmt = db.prepare( sql.table('lorem').insert('id','foo').sql() );
                for (let i = 0; i < 10; i++) {
                    stmt.run(i, "Ipsum " + i);
                }
                stmt.finalize();
    
                db.all( sql.table('lorem').select('id','foo').sql(), (err, rows) => {
                    expect(rows.length).toBe(10)
                });
            })
        })
    })

    describe('delete', () => {
        beforeEach( () => {
            db.serialize(() => {
                db.run("CREATE TABLE lorem (info VARCHAR(10))");
                const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
                for (let i = 0; i < 10; i++) {
                    stmt.run("Ipsum " + i);
                }
                stmt.finalize();
            })
        })

        it('should delete a single record', () => {
            db.serialize( () => {
                db.run(
                    sql.table('lorem').delete().where('info','=','?').sql(),
                    "Ipsum 1",
                    (err) => {
                        if (err) console.log("Error", err)
                    }
                )
                db.all( 
                    sql.table('lorem').select('info').where('info','=','?').sql(),
                    "Ipsum 1",
                    (err, rows) => {
                        expect(rows.length).toBe(0)
                    }
                )
            })
        })

        it('should delete multiple records', async () => {
            db.serialize( () => {
                db.all( 
                    sql.table('lorem').select('info').where('info','like','?').sql(),
                    "Ipsum%",
                    (err, rows) => {
                        expect(rows.length).toBe(10)
                    }
                )
                db.run(
                    sql.table('lorem').delete().where('info','like','?').sql(),
                    "Ipsum%",
                    (err) => {
                        if (err) console.log("Error", err)
                    }
                )
                db.all( 
                    sql.table('lorem').select('info').where('info','like','?').sql(),
                    "Ipsum%",
                    (err, rows) => {
                        expect(rows.length).toBe(0)
                    }
                )
            })
        })
    })

    describe('update', () => {
        beforeEach( () => {
            db.serialize(() => {
                db.run("CREATE TABLE lorem (id INT(11), info VARCHAR(10))");
                const stmt = db.prepare("INSERT INTO lorem VALUES (?,?)");
                for (let i = 0; i < 10; i++) {
                    stmt.run(i, "Ipsum " + i);
                }
                stmt.finalize();
            })
        })

        it('should update a single record', () => {
            db.serialize( () => {
                db.run(
                    sql.table('lorem').update('info').where('id','=',6).sql(),
                    'Bar'
                )

                db.all(
                    sql.table('lorem').select('info').where('id','=',6).sql(),
                    (err, rows) => {
                        expect(rows[0].info).toBe('Bar')
                    }
                )
            })
        })

        it('should update multiple records', () => {
            db.serialize( () => {
                db.run(
                    sql.table('lorem').update('info').sql(),
                    'Bar'
                )

                db.all(
                    sql.table('lorem').select('info').where('info','=','?').sql(),
                    'Bar',
                    (err, rows) => {
                        expect(rows.length).toBe(10)
                    }
                )
            })
        })
    })


})
