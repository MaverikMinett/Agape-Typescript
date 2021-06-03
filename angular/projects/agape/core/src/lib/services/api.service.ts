import { Injectable, Injector } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Environment } from './environment'

@Injectable()
export class ApiService {

  /* Get the api url from the environment settings */
  public apiRoot:string

  /* the api endpoint needs to be set in each derived class */
  public apiPath:string 

  /* add a trailing slash to api ruls */
  public trailingSlash:boolean = true

  /* environment. this must be provided by the consuming application */
  protected environment: Environment

  /* generic services */
  protected http: HttpClient

  constructor(public injector: Injector ) {
    this.http        = injector.get(HttpClient);
    this.environment = injector.get(Environment)
    this.apiRoot     = this.environment.get('apiRoot');
  }


  /**
   * Return the full path to the api end point. Passing in an itemId will append
   * to the url.
   * 
   * @param suffix Optional argument to append the record id to the url.
   * return        Url for making api calls
   */
  api(...suffix:Array<any>): string {

    /* first url segment is always the apiRoot */
    let segments = [this.apiRoot];

    /* if first argument is not a "/" append this services api path if one exists */
    if ( suffix.length == 0 || suffix[0] != '/' ) {
      if ( this.apiPath ) segments.push( this.apiPath )
    }

    /* if the first argument is a slash, ignore the services apiPath variable */
    else if ( suffix[0] == '/' ) {
      suffix.shift()
    }
    
    /* append any segments passed to the method */
    if ( suffix ) segments.push( ...suffix )

    /* join the segments */
    let url = segments.join('/');

    /* add a trailing slash */
    if ( this.trailingSlash )
      url += '/';

    /* return the constructed url */
    return url
  }


  /**
   * Return the http options for the request. Accepts a params dict and a headers
   * dict as optional arguments. If no headers are supplied in the method call,
   * the default headers from the httpHeaders property will be used.
   * 
   * @param  params  Query params to be sent with the request
   * @param  headers The headers to send with the request
   */
  protected httpOptions( params?:any, headers?:HttpHeaders ): any {
    let options:any = {};
    options.headers = headers ? headers : this.httpHeaders();
    if (params) options.params = params;
    return options;
  }



  /**
   * Return the http headers to send with every request. Accepts a dictionary
   * of header key,pair values that will be passed to the headers object
   * constructor
   * 
   * @param  headers The headers to send with the request
   */
  protected httpHeaders( headers={} ):HttpHeaders {
    /* http headers to use for each request */
    return new HttpHeaders({
        'Content-Type':  'application/json',
        ...headers
      })
  }

}
