import { Injectable, } from '@angular/core';
import { ApiService } from './api.service'


@Injectable()
export class CrudService extends ApiService {

  create(data:any, params:any={}) {

    let httpOptions = this.httpOptions( params )

    return this.http.post( this.api(), data, httpOptions )

  }


  retrieve( id:number, params:any={} ) {

    let httpOptions = this.httpOptions( params )

    return this.http.get( this.api(id), httpOptions )

  }


  update( id:number, data:any, params:any={} ) {

    let httpOptions = this.httpOptions( params )

    return this.http.patch( this.api(id), data, httpOptions );
      
  }


  delete( id:number, params:any={} ) {

    let httpOptions = this.httpOptions( params )

    return this.http.delete( this.api(id), httpOptions )
  }



  list(params:any={}) {

    let httpOptions = this.httpOptions( params )

    return this.http.get( this.api(), httpOptions)

  }

  save( data:any, params:any={} ) {

    if ( data.id ) {

      return this.update(data.id, data, params)

    }
    else {

      return this.create(data,params)

    }

  }

}
