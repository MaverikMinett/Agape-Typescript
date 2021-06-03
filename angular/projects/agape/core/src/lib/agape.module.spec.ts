import { AgapeModule } from './agape.module';
import { TestBed } from '@angular/core/testing';

describe('AgapeModule', () => {
  let agapeModule: AgapeModule;

  beforeEach(() => {
    agapeModule = undefined
  });

  it('should create an instance', () => {
    agapeModule = new AgapeModule();
    expect(agapeModule).toBeTruthy();
  });


});


import { Environment } from './services/environment';


describe(`AgapeModule.forRoot()`, () => {

    const opts = { 
      environment: { production: false, apiRoot: './api' },
    };

    let environment: Environment

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AgapeModule.forRoot(opts)
            ]
        });

        environment = TestBed.inject(Environment)
    });

    it(`should provide the environment service`, () => {
        expect( TestBed.inject(Environment) ).toBeTruthy();
    });

    it(`should configure the the environment service`, () => {
        expect(environment.get('apiRoot')).toEqual(opts.environment.apiRoot)
    });

});