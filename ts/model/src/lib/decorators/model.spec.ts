
import { ModelDescriptor } from '../descriptors';
import { Model } from './model'


describe('Model', () => {
    it('should create a model descriptor', () => {
        @Model class Foo { }
        const d = Reflect.getMetadata( "model:descriptor", Foo );
        expect(d).toBeInstanceOf(ModelDescriptor)
    })
    it('should create a model descriptor', () => {
        @Model class Foo { }
    })
    it('should accept empty parameters list', () => {
        @Model() class Foo {}
    })
})