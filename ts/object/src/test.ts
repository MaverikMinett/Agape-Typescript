import { build } from "./lib/decorators/build";
import { coerce } from "./lib/decorators/coerce";
import { lazy } from "./lib/decorators/lazy";
import { meta } from "./lib/meta";
import { inflate } from "./lib/serializer";
import { unveil } from "./lib/unveil";

class Bar {
  material: string;
}

class Foo {
  name: string;

  @coerce([Bar])
  bars: Bar[] = []
}

const payload = {
  name: 'Baz',
  place: 'Place',
  bars: [{ material: 'wood' }, { material: 'metal' }]
};
const o = inflate<Foo>(Foo, payload);



console.log( unveil(o) )
