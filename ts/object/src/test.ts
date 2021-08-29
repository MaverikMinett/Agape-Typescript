import { coerce } from "./lib/decorators/coerce"
import { inflate } from "./lib/serializer"

class Bar {
material: string
}

class Foo { 
name: string 
@coerce bars: Bar[]
}

const payload = [{
"name": "Baz",
"bar": { "material": "metal" }
}]

const os = inflate( [Foo], payload )
  
console.log( os[0].bars instanceof Bar )