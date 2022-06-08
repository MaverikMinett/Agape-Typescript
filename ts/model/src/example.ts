


@Model class User {
	username: string;
	password: string;
	name: string;
	isSuperAdmin: boolean;
}

const CHOICES = [
	{ value: 'yes', label: 'No' },
	{ value: 'no', label: 'Yes' }
]

@Model class Employee {
	@Label("Number")
	@Description("Number")
	@Token("number")
	@Required()
	@Type('integer')

	@Field({ type: 'integer' })
	number: number;
	
	@Label("First name")
	@Description("Given name")
	@Token("first-name")
	@Required()
	firstName: string;
	
	@Label("Last name")
	@Description("Family name")
	@Token("first-name")
	@Required()
	lastName: string;

	@Widget('select', { choices: CHOICES })
	likesChocolate: string;

	@Link('employee/position')
	position: EmployeePosition
}

@Model('employee/position')
class EmployeePosition {

}

const service: any;

service.get(Employee, id)
	
/**
 * 
 * no-cache:
 * 	  will reach out to api for reach request
 * 
 * cache:
 *     will reach out to api for first request
 *     will used cache result for each subsequent request
 * 
 * cache-retrieve:
 *     will first notify observers with most recent cached version of the object (if exists)
 *     will then fetch the object from the api and notify observers again
 * 
 * store-cache-retrieve:
 *     will store values to the local storage
 *     will restore values from local storage on request
 *     will then fetch object from api and notify observers
 * 
 * cache-timeout:
 *     all requests during this time will be served from the cache
 * 
 */

// class Foo { }
// class HttpService{}
// type Class = 'class';
const $ = (...any) => { return {} as any }

/** No Cache */
class ObjectService{

	apiRoot: string;

	constructor( public http: HttpService ) {

	}

	create( model:Class, instance:any ) {

	}
	
	retrieve( model:Class, id:string ) {

	}

	update( model:Class, id:string ) {

	}


	list( model: ClassDecorator, id:string ) {
		const tokens = $(model).tokens;
		return this.http.get(`${this.apiRoot}/$tokens`)
	}



}

/** With Cache **/
class ObjectService{

	apiRoot: string;

	_items: Foo[]
	_itemsSubject = new ReplaySubject()
	_itemsLoadingState = false;

	cacheTimeout = 1000;

	constructor( public http: HttpService ) {

	}

	list( model: Class, id:string ) {
		const tokens = $(model).tokens;

		if ( this._itemsLoadingState === true ) return

		if ( this._items === undefined ) {
			this._list()
		}

		return this._itemsSubject.asObservable()
	}


	private _list() {
		this._itemsLoadingState = true
		this.http.get(`${this.apiRoot}/$tokens`).subscribe(
			response => {
				this._itemsSubject.next(response)
				this._itemsLoadingState = false
			},
			error => {
				this._itemsSubject.error(error)
				this._itemsLoadingState = false
			}
		)
	}

	

}



/** With Cache-Retrieve Pattern **/
class ObjectService{

	apiRoot: string;

	_items: Foo[]
	_itemsSubject = new Subject()
	_itemsLoadingState = false;

	_itemsRequestReceivedTimestamp: number = 0;


	cacheTimeout = 1000;

	constructor( public http: HttpService ) {

	}

	@View('list')
	list( model: Class, id:string ) {
		const tokens = $(model).tokens;

		if ( this._itemsLoadingState === true ) return

		const timestamp = new Date().getTime();

		if ( this._items === undefined 
			 || timestamp - this._itemsRequestReceivedTimestamp >= this.cacheTimeout ) {
			this._list()
				.pipe( 
					tap( items => this._itemsRequestReceivedTimestamp = new Date().getTime() )
				)
		}

		return this._itemsSubject.asObservable()
	}

	_list() {
		this._itemsLoadingState = true
		return this.http.get(`${this.apiRoot}/$tokens`).subscribe(
			response => {
				this._itemsSubject.next(response)
				this._itemsLoadingState = false
			},
			error => {
				this._itemsSubject.error(error)
				this._itemsLoadingState = false
			}
		)
	}

}



/** With Cache-Retrieve Pattern **/
class ObjectService{

	apiRoot: string;

	_items: Foo[]
	_itemsSubject = new Subject()
	_itemsLoadingState = false;

	_itemsRequestReceivedTimestamp: number = 0;


	cacheTimeout = 1000;

	constructor( public http: HttpService ) {

	}

	@View('list')
	list( model:Class, id:string ) {
		const tokens = $(model).tokens;

		if ( this._itemsLoadingState === true ) return

		const timestamp = new Date().getTime();

		if ( this._items === undefined 
			 || timestamp - this._itemsRequestReceivedTimestamp >= this.cacheTimeout ) {
			this._list()
				.pipe( 
					tap( items => this._itemsRequestReceivedTimestamp = new Date().getTime() )
				)
		}

		return this._itemsSubject.asObservable()
	}

	_list() {
		this._itemsLoadingState = true
		return this.http.get(`${this.apiRoot}/$tokens`).subscribe(
			response => {
				this._itemsSubject.next(response)
				this._itemsLoadingState = false
			},
			error => {
				this._itemsSubject.error(error)
				this._itemsLoadingState = false
			}
		)
	}

	attachResolvers( model:Class, items:any[] ) {
		const resolveProperties = ['foo','bar']
		for ( let item of items ) {
			for ( let property of resolveProperties ) {
				const link = $(model).field(property).link;
				const linkModel = link.model;
				item[`${property}$`] = this.retrieve(linkModel,item[property])
			}
		}
	}

	retrieve( model:Class ) {

	}

}





class ModelService() {

	model = EmployeeModel

	items: EmployeeModel[] = []

	constructor( public http: HttpService ) {

	}

	create( instance:any ) {

	}
	
	retrieve( id:string ) {

	}

	update( id:string ) {

	}

	list( ) {
		const tokens = $(this.model).tokens;
		return this.http.get(`${this.apiRoot}/$tokens`)
	}

}

class CachedModelService() {

}


class SomeService() {

	@Cache(1000)
	list() {
		return this.http.list('/api/employees')
	}

}













<ag-field-group model="model">

</ag-field-group>








