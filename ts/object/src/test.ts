// Import stylesheets

import { include } from './lib/decorators/include';


const appDiv: HTMLElement = document.getElementById('app');

/**
 * Example of the initial value of a property not being
 * carried into the consuming class
 */

class ATrait {
  foo: string = 'bar';
}

interface AClass extends ATrait {}
@include(ATrait)
class AClass {}

const o = new AClass();

/* result is undefined, not 'bar'' */
appDiv.innerHTML = `${o.foo}`;
