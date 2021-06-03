import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { AGAPE_OPTS } from './agape-opts.token';
import { Environment } from './services/environment';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class AgapeModule { 

  /* Only allow importing into the root AppModule */
  constructor( @Optional() @SkipSelf() parentModule: AgapeModule=null ) {
    if (parentModule) {
      throw new Error('AgapeModule is already loaded. It should only be imported in the application\'s main module.');
    }
  }

  /**
   * Here the environment service is provided using values from the "environment" options
   * passed in by the consumer.
   */
  static forRoot( options:any ): ModuleWithProviders<AgapeModule> {

    return {
      ngModule: AgapeModule,
      providers: [ 
       { provide: AGAPE_OPTS, useValue: options },
       Environment
      ]
    }
  }

}
