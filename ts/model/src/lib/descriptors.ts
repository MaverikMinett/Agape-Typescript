import { camelize, pluralize, tokenize, verbalize } from "@agape/string";

export type FieldDescriptorParams = Partial<Pick<FieldDescriptor, keyof FieldDescriptor>>;
export type ModelDescriptorParams = Partial<Pick<ModelDescriptor, keyof ModelDescriptor>>;

export class ModelDescriptor {

    name: string;

    label: string;

    plural: string;

    description: string;

    token: string;

    tokens: string;

    fields: FieldDescriptorSet;

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
        if ( this.name || this.label ) {
            this.name   ??= camelize(this.label)
            this.label  ??= verbalize(this.name)
            this.plural ??= pluralize(this.label)
            this.token  ??= tokenize(this.name)
            this.tokens ??= pluralize(this.token)
        }
    }

    public field( name:string ):FieldDescriptor {
        if ( ! this.fields.has(name) ) {
            throw new Error(`Model ${this.name} does not have field ${name}`)
        }

        return this.fields.get(name)
    }

    public add( field:FieldDescriptor ) {
        if ( this.fields.has(field.name) ) {
            throw new Error(`Field ${field.name} is already defined on model ${this.name}`)
        }
        this.fields.set(field.name, field)
    }

}



export class FieldDescriptor {
    
    name: string;

    label: string;

    plural: string;

    description: string;

    link: string;
    // ᚲᚲid: string;

    column: string;

    required: boolean;

    token: string;

    tokens: string;

    type: string;

    widget: string;

    constructor()
    constructor( name:string, type?:string, widget?:string ) 
    constructor( params: FieldDescriptorParams )
    constructor( ...args:any[] ) {
        let params: FieldDescriptorParams
        if ( args.length === 1 && ! ( args[0] instanceof String ) ) {
            params = args[0]
        }
        else {
            const [name, type, widget] = args;
            params = { name, type, widget }
        }
        Object.assign(this, params)

        this.name   ??= camelize(this.label)
        this.label  ??= verbalize(this.name)
        this.plural ??= pluralize(this.label)
        this.token  ??= tokenize(this.name)
        this.tokens ??= pluralize(this.token)
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