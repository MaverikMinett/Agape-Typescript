
import { Injectable, Injector} from '@angular/core';

export interface EnvironmentOptions {
    production?: boolean;
    apiRoot?: string;
    aioRoot?: string;
}


import { AGAPE_OPTS } from '../agape-opts.token'

/**
 * Provide the environment file as a service. The user is required to pass
 * in the environment file to the Agape module when importing into the root
 * module.
 * 
 * This is done because the ApiService or any other reusable packages which
 * are included in a project will not have direct access to the project 
 * environment.ts file. In this way environment variables such as an 
 * apiPath can be provided to these resuable libraries.
 */
@Injectable()
export class Environment {

  /* This is the environment object that is passed in */
  public _opts:{[key:string]: any}

  constructor( injector: Injector ) {
    let opts = <any>injector.get( AGAPE_OPTS )
    if ( opts.environment ) {
      this.configure( opts.environment );
    }
    
  }

  configure( opts:EnvironmentOptions ) {
    this._opts = opts;
  }

  get( key:string, defaultValue:any=undefined ) {
    return this._opts.hasOwnProperty( key ) ? this._opts[key] : defaultValue
  }
  
}
