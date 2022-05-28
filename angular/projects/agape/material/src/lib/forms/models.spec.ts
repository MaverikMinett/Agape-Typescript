import { Field } from "./models"


describe('Field', () => {

    let f: Field

    afterEach( () => {
        f = undefined
    })

    it('should instantiate', () => {
        f = new Field()
        expect(f).toBeTruthy()
    })

    describe('the constructor', () => {
        it('should accept a name as a single argument', () => {
            f = new Field('foo')
            expect(f).toBeTruthy()
            expect(f.name).toBe('foo')
        })
    
        it('should accept a name and type as two arguments', () => {
            f = new Field('foo', 'string')
            expect(f).toBeTruthy()
            expect(f.name).toBe('foo')
            expect(f.type).toBe('string')
        })
    
        it('should accept a name, type, and params as three arguments', () => {
            f = new Field('foo', 'string', { widget: 'select' } )
            expect(f).toBeTruthy()
            expect(f.name).toBe('foo')
            expect(f.type).toBe('string')
            expect(f.widget).toBe('select')
        })
    
        it('should accept a parameters object as a single argument', () => {
            f = new Field({ name: 'foo', widget: 'select' } )
            expect(f).toBeTruthy()
            expect(f.name).toBe('foo')
            expect(f.widget).toBe('select')
        })

    })

    describe('label', () => {
        it('should auto-populate', () => {

        })
        it('should use value passed to constructor', () => {

        })
    })

    describe('token', () => {
        it('should auto-populate', () => {

        })
        it('should use the value passed to the constructor', () => {

        })
    })

    describe('description', () => {
        it('should not auto-populate', () => {

        })
        it('should use the value passed to the constructor', () => {

        })
    })

    describe('defaultValue', () => {
        it('should default to undefined', () => {

        })
    })

    describe('required', () => {
        it('should default to undefined', () => {

        })
    })

    describe('choices', () => {
        it('should default to undefined', () => {
            
        })
    })

    describe('widget', () => { 
        describe('auto-populate', () => {
            describe('type = string', () => {
                it('should be input', () => {

                })
            })
            describe('type = integer', () => {
                it('should be input', () => {

                })
            })
            describe('type = decimal', () => {
                it('should be input', () => {

                })
            })
            describe('type = boolean', () => {
                it('should be checkbox', () => {

                })
            })
            describe('type = date', () => {
                it('should be date', () => {

                })
            })
        })
    })

    describe('type', () => {
        it('should default to string', () => {

        })
    })


})