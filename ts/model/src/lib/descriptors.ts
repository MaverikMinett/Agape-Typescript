import { camelize, pluralize, tokenize, verbalize } from "@agape/string";

export type FieldDescriptorParams = Partial<Pick<FieldDescriptor, keyof FieldDescriptor>>;
export type ModelDescriptorParams = Partial<Pick<ModelDescriptor, keyof ModelDescriptor>>;

/**
 * Meta data describing a model.
 */
export class ModelDescriptor {

    name: string;

    label: string;

    plural: string;

    description: string;

    symbol: string;            // the class name

    token: string;

    tokens: string;

    fields: FieldDescriptorSet = new FieldDescriptorSet()

    constructor ( name?:string, params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( ...args:any[] ) {
        let name: string; 
        let params: Partial<Pick<ModelDescriptor, keyof ModelDescriptor>>
        if ( args.length === 1 && args[0] instanceof Object ) {
            params = {...args[0]}
        }
        else {
            [name, params] = args
            params ??= {}
            params.name = name;
        }
        if ( params ) Object.assign(this, params)
        this.autopopulate()
    }

    public field( name:string ):FieldDescriptor {
        if ( ! this.fields.has(name) ) {
            throw new Error(`${this.name} does not have field ${name}`)
        }

        return this.fields.get(name)
    }

    public add( field:FieldDescriptor ) {
        if ( this.fields.has(field.name) ) {
            throw new Error(`Field ${field.name} is already defined on ${this.name}`)
        }
        this.fields.set(field.name, field)
    }

    public autopopulate() {
        if ( this.name || this.label ) {
            this.name   ??= camelize(this.label)
            this.label  ??= verbalize(this.name)
            this.plural ??= pluralize(this.label)
            this.token  ??= tokenize(this.name)
            this.tokens ??= pluralize(this.token)
        }
    }

}

/**
 * Meta data describing a view
 */
export class ViewDescriptor extends ModelDescriptor {

    title?: string;

    model?: ModelDescriptor;

    constructor ( model?: ModelDescriptor )
    constructor ( name?:string, params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( params?:Partial<Pick<ModelDescriptor, keyof ModelDescriptor>> )
    constructor ( ...args:any[] ) {
        if ( args.length === 1 && args[0] instanceof ModelDescriptor ) {
            const model = args.shift()
            super( )
            this.model = model;
        }
        else {
            super( ...args )
        }
    }

}


export class FieldDescriptor {
    
    name?: string;            // the name of the field

    label?: string;           // label for the field, autopopulated if unset

    plural?: string;          // plural label for the field, autopoulated if unset

    description?: string;     // description of the field

    length?: number;          // maximum length of the field in characters (used to create database schema)

    link?: string;            // link to another model or view
    // ᚲᚲid: string;          // the id of the linked field

    column?: string;          // property name in the database

    required?: boolean;       // markt the field as required

    token?: string;           // kebab-case version of the field name

    tokens?: string;          // plural kebab-case version of the field name

    type?: string;            // string, number, text, date

    widget?: string;          // input, date, textarea, does not autopopulate

    constructor()
    constructor( name:string, type?:string, widget?:string ) 
    constructor( params: FieldDescriptorParams )
    constructor( ...args:any[] ) {
        let params: FieldDescriptorParams
        if ( args.length === 1 && ! ( typeof args[0] === 'string' ) ) {
            params = {...args[0]}
        }
        else {
            const [name, type, widget] = args;
            params = { name, type, widget }
        }
        Object.assign(this, params)
        this.autopopulate()
    }

    autopopulate() {
        if ( this.name || this.label ) {
            this.name   ??= camelize(this.label)
            this.label  ??= verbalize(this.name)
            this.plural ??= pluralize(this.label)
            this.token  ??= tokenize(this.name)
            this.tokens ??= pluralize(this.token)
        }
    }

}


/**
 * A set containing the managed properties that exist on an object.
 */
 export class FieldDescriptorSet {
    private ʘ: { [key: string]: FieldDescriptor  }

    constructor( from?: FieldDescriptorSet ) { 
        this.ʘ = {}
        if ( from ) this.merge( from )
    }

    get length(): number {
        return Object.keys(this.ʘ).length
    }

    /**
     * Merge descriptors from another set into this set
     * @param from 
     */
    merge( from: FieldDescriptorSet ) {
        Object.assign( this.ʘ, from.ʘ )
    }

    /**
     * Does a descriptor with the given name exist in the set
     * @param name 
     */
    has( name: string ): boolean {
        return name in this.ʘ;
    }

    /**
     * Get the descriptor with the provided name
     * @param name 
     */
    get( name: string ): FieldDescriptor {
        return this.ʘ[name]
    }

    /**
     * Get names of all descriptors which exist in the set.
     */
    get names( ): Array<string> {
        return Object.getOwnPropertyNames(this.ʘ)
    }

    /**
     * Set the descriptor of the given name
     * @param name 
     * @param descriptor 
     */
    set( name: string, descriptor: FieldDescriptor ) {
        return this.ʘ[name] = descriptor
    }

    /**
     * Execute a function on each item in the set
     * @param callback 
     */
    forEach( callback: ( propertyName:string, definition: FieldDescriptor ) => void ) {
        for ( let propertyName in this.ʘ ) {
            callback( propertyName, this.ʘ[propertyName] )
        }
    }
}