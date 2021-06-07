
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { AGAPE_OPTS } from '../agape-opts.token';
import { ApiService } from './api.service';

import { Environment } from './environment';


describe('ApiService', () => {

  let service: any
  const env = { apiRoot: '/api', production: false }

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        Environment,
        { provide: AGAPE_OPTS, useValue: { environment: env } },
      ],
      imports: [
        HttpClientTestingModule,
      ]

    });

    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an apiRoot', () => {
    expect(service.apiRoot).toBeTruthy();
    expect(service.apiRoot).toEqual( env.apiRoot );
  });

  it('should have an apiPath', () => {
    service.apiPath = 'entities'
    expect(service.apiPath).toBe('entities');
  });  

  it('should return an api end point with suffix', () => {
    let targetApiUrl = `${env.apiRoot}/suffix/`
    expect(service.api('suffix')).toBe(targetApiUrl);
  });

  it('should return an api end point with multiple suffixes', () => {
    let targetApiUrl = `${env.apiRoot}/suffix/1/`
    expect(service.api('suffix',1)).toBe(targetApiUrl);
  });

  it('should return an api end point with path', () => {
    service.apiPath = 'entities'
    let targetApiUrl = `${env.apiRoot}/entities/`
    expect(service.api()).toBe(targetApiUrl);
  });

  it('should return an api end point with path and suffix', () => {
    service.apiPath = 'entities'
    let targetApiUrl = `${env.apiRoot}/entities/1/`
    expect(service.api(1)).toBe(targetApiUrl);
  });

  it('should return an api end point with path and suffix', () => {
    service.apiPath = 'entities'
    let targetApiUrl = `${env.apiRoot}/entities/1/`
    expect(service.api(1)).toBe(targetApiUrl);
  });

  it('should return an api end point from the root path', () => {
    service.apiPath = 'entities'
    let targetApiUrl = `${env.apiRoot}/suffix-from-root/`
    expect(service.api('/', 'suffix-from-root') ).toBe(targetApiUrl);    
  })

  it('should return httpOptions with default application/json content-type', () => {
    expect( service.httpOptions().headers ).toBeTruthy();
  });

  it('should return httpOptions with supplied params', () => {
    let params = { 'id': 1, 'foo': 'bar' }
    expect( service.httpOptions(params).params ).toEqual( params );
  });

});
