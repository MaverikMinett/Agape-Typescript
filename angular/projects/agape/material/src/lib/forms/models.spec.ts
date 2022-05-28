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
            f = new Field({ name: 'firstName' })
            expect(f.label).toBe('First name')
        })
        it('should use value passed to constructor', () => {
            f = new Field({ name: 'foo', label: 'First Name' })
            expect(f.label).toBe('First Name')
        })
    })

    describe('token', () => {
        it('should auto-populate', () => {
            f = new Field({ name: 'firstName' })
            expect(f.token).toBe('first-name')
        })
        it('should use the value passed to the constructor', () => {
            f = new Field({ name: 'firstName', token: 'foo' })
            expect(f.token).toBe('foo')
        })
    })

    describe('description', () => {
        it('should not auto-populate', () => {
            f = new Field({ name: 'firstName' })
            expect(f.description).toBeUndefined()
        })
        it('should use the value passed to the constructor', () => {
            f = new Field({ name: 'firstName', description: 'Foo field rules' })
            expect(f.description).toEqual('Foo field rules')
        })
    })

    describe('defaultValue', () => {
        it('should default to undefined', () => {
            f = new Field({ name: 'firstName' })
            expect(f.defaultValue).toBeUndefined()
        })
    })

    describe('required', () => {
        it('should default to undefined', () => {
            f = new Field({ name: 'firstName' })
            expect(f.required).toBeUndefined()
        })
    })

    describe('choices', () => {
        it('should default to undefined', () => {
            f = new Field({ name: 'firstName' })
            expect(f.choices).toBeUndefined()
        })
    })

    describe('type', () => {
        it('should default to string', () => {
            f = new Field({ name: 'firstName' })
            expect(f.type).toBe('string')
        })
    })

    describe('widget', () => { 
        describe('auto-populate', () => {
            describe('type = string', () => {
                it('should be input', () => {
                    f = new Field({ name: 'firstName', type: 'string' })
                    expect(f.widget).toBe('input')
                })
            })
            describe('type = integer', () => {
                it('should be input', () => {
                    f = new Field({ name: 'foo', type: 'integer' })
                    expect(f.widget).toBe('input')
                })
            })
            describe('type = decimal', () => {
                it('should be input', () => {
                    f = new Field({ name: 'foo', type: 'decimal' })
                    expect(f.widget).toBe('input')
                })
            })
            describe('type = boolean', () => {
                it('should be checkbox', () => {
                    f = new Field({ name: 'foo', type: 'boolean' })
                    expect(f.widget).toBe('checkbox')
                })
            })
            describe('type = date', () => {
                it('should be date', () => {
                    f = new Field({ name: 'foo', type: 'date' })
                    expect(f.widget).toBe('date')
                })
            })
            describe('type = text', () => {
                it('should be text', () => {
                    f = new Field({ name: 'foo', type: 'text' })
                    expect(f.widget).toBe('text')
                })
            })
        })
    })




})