import {  } from "jasmine"

/**
 * Describes a method and all associated modifiers and provides the
 * method dispatcher.
 */
export class MethodDescriptor {

    ʘafter    : Array< () => void >
    ʘaround   : Array< () => void >
    ʘbefore   : Array< () => void >
    // ʘvalue    : any
    ʘdefault    : any
    ʘoverride   : any
    ʘstack    : Array< () => void >

    after( value: () => void ) {
        this.ʘafter || ( this.ʘafter = [] )
        this.ʘafter.push( value )
        return this
    }

    // around( value: (original, ...args) => any ) {
    //     let original = this.ʘvalue
    //     this.ʘvalue  =  function ( ...args:any[] ) {
    //         return value.call(this, original, ...args )
    //     }
    //     return this
    // }

    before( value: () => void ) {
        this.ʘbefore || ( this.ʘbefore = [] )
        this.ʘbefore.push( value )
        return this
    }

    // value( value: () => void ) {
    //     this.ʘvalue = value
    //     return this
    // }

    default( value: () => void ) {
        this.ʘdefault = value
        return this
    }

    override( value: () => void ) {
        this.ʘoverride = value
        return this
    }

    stack( value: () => void ) {
        this.ʘstack || ( this.ʘstack = [] )
        this.ʘstack.push( value )
    }

    does ( modifier:string ) {
        return this[`ʘ${modifier}`] ? true : false
    }

    /**
     * Execute the method all method modifiers.
     * @param target The object to call the method on
     * @param args The arguments to pass to the object
     */
    call( target:any, ...args ) {

        this.ʘbefore && this.callStack( 'before', target, ...args )

        /* call the 'primary' function */
        let f = this.ʘoverride || this.ʘdefault || function() {}
        let r = f.call( target, ...args )

        this.ʘstack  && this.callStack( 'stack', target, ...args )

        this.ʘafter  && this.callStack( 'after', target, ...args )

        return r
    }

    /**
     * Call a stack of methods.
     * @param modifier The name of the stack to execute
     * @param target The object on which to act
     * @param args The arguments to pass
     */
    callStack( modifier:string, target:any, ...args ) {
        for ( let func of this['ʘ' + modifier] ) {
            func.call( target, ...args )
        }
    }

    /**
     * Include the definitions from another method descriptor into this descriptor.
     * @param from Descriptor to include
     */
    include( from:MethodDescriptor ) {
        if ( this.ʘdefault === undefined ) this.ʘdefault = from.ʘdefault
        if ( !( from.ʘoverride === undefined ) ) this.ʘoverride = from.ʘoverride

        if ( from.ʘafter ) {
            this.ʘafter || ( this.ʘafter = [] )
            this.ʘafter.push( ...from.ʘafter )
        }
        if ( from.ʘbefore ) {
            this.ʘbefore || ( this.ʘbefore = [] )
            this.ʘbefore.push( ...from.ʘbefore )
        }
        if ( from.ʘstack ) {
            this.ʘstack || ( this.ʘstack = [] )
            this.ʘstack.push( ...from.ʘstack )
        }
    }

    install_dispatcher( target:any, name: string ) {
        let descriptor = this

        let original = Object.getOwnPropertyDescriptor( target, name )?.value

        if ( original ) this.ʘdefault = original

        Object.defineProperty( target, name, {
            value: function( ...args ) {
                return descriptor.call(this, ...args)
            }
        } )
    }

}


/**
 * A set containing the managed methods that exist on an object.
 */
export class MethodDescriptorSet {
    private ʘ: { [key: string]: MethodDescriptor  }

    constructor( from?: MethodDescriptorSet ) { 
        this.ʘ = {}
        if ( from ) this.merge( from )
    }

    merge ( from: MethodDescriptorSet ) {
        Object.assign( this.ʘ, from.ʘ )
    }

    public has( name: string ): boolean {
        return name in this.ʘ;
    }

    public get( name: string ): MethodDescriptor {
        if ( ! this.has(name) ) this.ʘ[name] = new MethodDescriptor()
        return this.ʘ[name]
    }

    get names( ): Array<string> {
        return Object.getOwnPropertyNames(this.ʘ)
    }

    public set( name: string, descriptor: MethodDescriptor ) {
        return this.ʘ[name] = descriptor
    }

    public forEach( callback: ( methodName:string, definition: MethodDescriptor ) => void ) {
        for ( let methodName in this.ʘ ) {
            callback( methodName, this.ʘ[methodName] )
        }
    }
}


/**
 * Describes an object, holding information about methods, properties, and traits.
 */
export class ObjectDescriptor {

    public methods: MethodDescriptorSet

    public properties: PropertyDescriptorSet
    
    public traits: Array<any>

    constructor( public target: any ) {
        this.properties = new PropertyDescriptorSet( this )
        this.methods = new MethodDescriptorSet()
    }

    public property( name:string ) {

        let descriptor

        if ( ! this.properties.has(name) ) {

            descriptor = new PropertyDescriptor(this, name);

            this.properties.set(name,descriptor)

            descriptor.install_dispatcher( )

        }

        else {
            descriptor = this.properties.get(name)
        }

        return descriptor
    }


    public method( name:string ) {

        let descriptor

        if ( ! this.methods.has(name) ) {
            descriptor = new MethodDescriptor();

            this.methods.set(name,descriptor)

            descriptor.install_dispatcher( this.target, name )

        }

        else {
            descriptor = this.methods.get(name)
        }

        return descriptor
    }


    

    public include( ...traits ) {
        this.traits || ( this.traits = [ ] )

        let target = this.target

        // console.log("include", target, trait )

        this.traits.push( ...traits )

        for ( let trait of traits ) {

            if ( typeof target === "function" ) target = target.prototype
            if ( typeof trait === "function" )  trait  = trait.prototype

            /* copy over default method implementations */
            for ( let propertyName of Object.getOwnPropertyNames( trait ) ) {
                if ( propertyName[0] === "ʘ" ) continue;
                if ( propertyName[0] === "Δ" ) continue;
                if ( propertyName === "constructor" ) continue;

                /* don't over-write existing definitions from the consuming class */
                if ( target.Δmeta?.methods.has(propertyName) ) continue;
                if ( target.Δmeta?.properties.has(propertyName) )  continue;

                /* don't copy anything that is managed by agape meta data */
                if ( trait.Δmeta?.properties.has(propertyName) )  continue;
                if ( trait.Δmeta?.methods.has(propertyName) )  continue;
                
                if ( ! ( propertyName in target ) ) {
                    Object.defineProperty( target, propertyName, { 
                        value: Object.getOwnPropertyDescriptor( trait, propertyName ).value
                    })
                }
            }

            if ( trait.Δmeta?.methods ) {
                for ( let name of trait.Δmeta.methods.names ) {

                    if ( ! target.Δmeta.methods.has(name) ) {
                        target.Δmeta.method( name ).install_dispatcher( target )
                    }

                    target.Δmeta.method( name ).include( trait.Δmeta.method(name) )
                }
            }

            if ( trait.Δmeta?.properties ) {
                for ( let name of trait.Δmeta.properties.names ) {

                    if ( ! target.Δmeta.properties.has(name) ) {
                        target.Δmeta.property( name ).install_dispatcher( target )
                    }
                    target.Δmeta.property( name ).include( trait.Δmeta.property(name) )
                }  
            }
        }

        return this
    }


}


/**
 * Describes the property of an object any associated modifiers. Provides
 * the property dispatcher.
 */
export class PropertyDescriptor {

    public ʘdelegate: { to?: Object|Function, property?: string }
    public ʘdefault: any
    public ʘenumerable: boolean
    
    public ʘreadonly: boolean
    public ʘoverride: boolean
    public ʘinherit: { from?: Object|Function, property?: string }

    constructor( public progenitor: ObjectDescriptor, public name:string ) {

    }

    delegate( to:Object, property:string ) {
        this.ʘdelegate || ( this.ʘdelegate = {} )
        this.ʘdelegate.to = to
        if ( property != undefined) this.ʘdelegate.property = property
    }

    default( value:any ) {
        this['ʘdefault'] === undefined && ( this['ʘdefault'] = value )
        return this
    }

    enumerable( value:boolean ) {
        if ( this.ʘenumerable != value ) {
            this.ʘenumerable = value
            this.install_dispatcher()
        }
    }

    readonly( value:any=true ) {
        this.ʘreadonly = value
        return this
    }

    override( value:any ) {
        this.ʘoverride = value
        return this
    }


    include( from: PropertyDescriptor ) {
        if ( this.ʘdefault === undefined || from.ʘoverride === true ) this.ʘdefault = from.ʘdefault
        if ( ! ( from.ʘoverride === undefined ) ) this.ʘoverride = from.ʘoverride
        if ( ! ( from.ʘreadonly === undefined ) ) this.ʘreadonly = from.ʘreadonly
    }

    inherit( from: Object|Function, property?:string ) {
        this.ʘinherit || ( this.ʘinherit = {} )
        this.ʘinherit.from = from
        if ( property != undefined) this.ʘinherit.property = property
    }

    get( instance:any ) {

        /* delegate */
        if ( this.ʘdelegate && this.ʘdelegate.to ) {
            return typeof this.ʘdelegate.to === "function"
            ? this.ʘdelegate.to.call(instance, instance)[this.ʘdelegate.property || this.name]
            : this.ʘdelegate.to[this.ʘdelegate.property || this.name]
        }

        if ( ! instance['ʘ' + this.name] ) {

            /* inherit */
            if ( this.ʘinherit ) {
                return typeof this.ʘinherit.from === "function"
                ? this.ʘinherit.from.call(instance,instance)[this.ʘinherit.property || this.name]
                : this.ʘinherit.from[ this.ʘinherit.property || this.name ]
            }

            /* default (lazy) */
            let value = typeof this.ʘdefault === "function" 
                ? this.ʘdefault.call(instance, instance)
                : this.ʘdefault

            Object.defineProperty(instance, `ʘ${this.name}`, { value: value, configurable: true, enumerable: false } )
        }

        return instance['ʘ' + this.name]
    }

    set( instance:any, value:any ) {

        /* read only */
        if ( this.ʘreadonly ) throw new Error('Cannot write to read-only value')

        /* delegate */
        if ( this.ʘdelegate && this.ʘdelegate.to ) {
            return typeof this.ʘdelegate.to === "function"
            ? this.ʘdelegate.to.call(instance, instance)[this.ʘdelegate.property || this.name] = value
            : this.ʘdelegate.to[this.ʘdelegate.property || this.name] = value
        }

        Object.defineProperty(instance, `ʘ${this.name}`, { value: value, configurable: true, enumerable: false } )

        
    }

    install_dispatcher( ) {

        // console.log( `Install dispatcher for ${this.name} to`, this.progenitor.target )
        // console.log(this.ʘenumerable)

        let descriptor = this
        let target = this.progenitor.target
        // console.log( target, target.prototype )
        
        Object.defineProperty( target, descriptor.name, {
            set: function(value:any) { return descriptor.set(this, value) },
            get: function() { return descriptor.get(this) },
            enumerable: this.ʘenumerable === false ? false : true,
            configurable: true
        } )
        Object.defineProperty( target, 'ʘ' + descriptor.name, {
            enumerable: false,
            configurable: true,
            writable: true
        } )


    }
}



/**
 * A set containing the managed properties that exist on an object.
 */
export class PropertyDescriptorSet {
    private ʘ: { [key: string]: PropertyDescriptor  }

    constructor( public progenitor: ObjectDescriptor, from?: PropertyDescriptorSet ) { 
        this.ʘ = {}
        if ( from ) this.merge( from )
    }

    merge ( from: PropertyDescriptorSet ) {
        Object.assign( this.ʘ, from.ʘ )
    }

    public has( name: string ): boolean {
        return name in this.ʘ;
    }


    public get( name: string ): PropertyDescriptor {
        if ( ! this.has(name) ) this.ʘ[name] = new PropertyDescriptor(this.progenitor, name)
        return this.ʘ[name]
    }

    get names( ): Array<string> {
        return Object.getOwnPropertyNames(this.ʘ)
    }

    public set( name: string, descriptor: PropertyDescriptor ) {
        return this.ʘ[name] = descriptor
    }

    public forEach( callback: ( propertyName:string, definition: PropertyDescriptor ) => void ) {
        for ( let propertyName in this.ʘ ) {
            callback( propertyName, this.ʘ[propertyName] )
        }
    }
}
