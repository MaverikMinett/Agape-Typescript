
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { AGAPE_OPTS } from '../agape-opts.token';

import { Environment } from './environment';


describe('Environment', () => {

  let service: any

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        Environment,
        { provide: AGAPE_OPTS, useValue: { environment: { apiRoot: '/api', production: false } } },
       
      ],
      imports: [
        HttpClientTestingModule,
      ]

    });

    service = TestBed.inject(Environment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an environment variable', () => {
    expect( service.get('apiRoot') ).toBe('/api');
  });

  it('should get another environment variable', () => {
    expect( service.get('production') ).toBeFalse();
  });
});
