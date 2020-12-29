import {} from "jasmine";
import { camelize, tokenize, verbalize, classify, pluralize, titalize } from './string'



describe('camelize', () => {

    it('should camelize a string', () => {
        expect( camelize('foo bar') ).toEqual('fooBar')
    })

})



describe('classify', () => {

    it('should classify a string', () => {
        expect( classify('foo bar') ).toEqual('FooBar')
    })

    it('should classify a token', () => {
        expect( classify('foo-bar') ).toEqual('FooBar')
    })

})

describe('pluralize', () => {

    it('should pluralize a string', () => {
        expect( pluralize('foo') ).toEqual('foos')
    })

    it('should pluralize octopus', () => {
        expect( pluralize('octopus') ).toEqual('octopi')
    })

    it('should pluralize city', () => {
        expect( pluralize('city') ).toEqual('cities')
    })
    
    it('should maintain case', () => {
        expect( pluralize('Foo') ).toEqual('Foos')
        expect( pluralize('OctoPus') ).toEqual('OctoPi')
        expect( pluralize('City') ).toEqual('Cities')
    })
})


describe('titalize', () => {

    it('should titalize the string', () => {
        expect( titalize('foo bar') ).toEqual('Foo Bar')
    })
    it('should maintain case after hyphen', () => {
        expect( titalize('foo-bar') ).toEqual('Foo-bar')
    })
    it('should lowercase functional words', () => {
        expect( titalize('hop on pop') ).toEqual('Hop on Pop')
        expect( titalize('ducks in a row') ).toEqual('Ducks in a Row')
        expect( titalize('james and the anteater') ).toEqual('James and the Anteater')
        expect( titalize('the wonderful world of mystery science') ).toEqual('The Wonderful World of Mystery Science')
    })

})

describe('tokenize', () => {

    it('should tokenize the string', () => {
        expect( tokenize('Foo Bar') ).toEqual('foo-bar')
    })

})


describe('verbalize', () => {
    
    it('should verbalize the string', () => {
        expect( verbalize('foo-bar') ).toEqual('Foo bar')
    })

})