import { meta } from '../meta'


export function include( ...traits:any ) {

	return function <T extends {new(...args:any[]):{}}>( target:T ) {

		meta(target).include( ...traits )

		return target

	}
}

