import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { AGAPE_OPTS } from '../agape-opts.token';
import { CrudService } from './crud.service';

import { Environment } from './environment';
import { HttpClient } from '@angular/common/http';

describe('CrudService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let service: any
  const env = { apiRoot: '/api', production: false }

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CrudService,
        Environment,
        { provide: AGAPE_OPTS, useValue: { environment: env } },
      ],
      imports: [
        HttpClientTestingModule,
      ]

    });

    service = TestBed.inject(CrudService);
    service.apiPath = 'entities';

    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController )
  });




  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('can test HttpClient.get', () => {
    const testData:any = { id: 1, name: 'Foo Bar' }

    httpClient.get<any>(`${env.apiRoot}/entities/1/`).subscribe( data => 
        expect(data).toEqual(testData)
      )

    const request = httpTestingController.expectOne(`${env.apiRoot}/entities/1/`)

    expect( request.request.method ).toEqual('GET')

    request.flush(testData)

    httpTestingController.verify()
  })


  /* create */
  it('should make a call to post', () => {
    const testData:any = { id: 1, name: 'Foo Bar' }

    service.create(testData).subscribe( data => 
        expect(data).toEqual(testData)
      )

    const request = httpTestingController.expectOne(`${env.apiRoot}/entities/`)

    expect( request.request.method ).toEqual('POST')

    request.flush(testData)

    httpTestingController.verify()
  });

  /* retrieve */
  it('should make a call to get', () => {
    const testData:any = { id: 1, name: 'Foo Bar' }

    service.retrieve(1).subscribe( data => 
        expect(data).toEqual(testData)
      )

    const request = httpTestingController.expectOne(`${env.apiRoot}/entities/1/`)

    expect( request.request.method ).toEqual('GET')

    request.flush(testData)

    httpTestingController.verify()
  });

  /* update */
  it('should make a call to patch', () => {
    const testData:any = { id: 1, name: 'Foo Bar' }

    service.update( 1, testData ).subscribe( data => 
        expect(data).toEqual(testData)
      )

    const request = httpTestingController.expectOne(`${env.apiRoot}/entities/1/`)

    expect( request.request.method ).toEqual('PATCH')

    request.flush(testData)

    httpTestingController.verify()
  });

  /* delete */
  it('should make a call to delete', () => {

    const testData:any = { id: 1, name: 'Foo Bar' }

    service.delete(1).subscribe( data => {} )

    const request = httpTestingController.expectOne(`${env.apiRoot}/entities/1/`)

    expect( request.request.method ).toEqual('DELETE')

    request.flush(testData)

    httpTestingController.verify()
  });

});
