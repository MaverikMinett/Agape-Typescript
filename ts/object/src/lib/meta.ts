import { ObjectDescriptor } from './descriptors'

/**
 * Get the ObjectDescriptor for an object or class
 * @param target Object to get descriptor for
 */
export function meta( target:any ):ObjectDescriptor {
    if ( typeof target === "function" ) target = target.prototype
    if ( ! target.hasOwnProperty('Δmeta') ) {
        Object.defineProperty(target, 'Δmeta', {
            value: new ObjectDescriptor(target),
            writable: false
        })
    }
    return target['Δmeta'];
}

