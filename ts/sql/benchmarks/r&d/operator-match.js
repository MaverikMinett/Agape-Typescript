import microtime from 'microtime';

/**
 * Benchmark fastest way to determine if a comparison operator 
 * is one of the 6 basic arithmatic operators.
 * 
 *  *  1  Regex
 *  *  2a Dictionary lookup
 *  *  2b Dictionary and "in" operator
 *  *  3  Array "includes" opeartor
 */
const operators = [ '=', '!=', '<', '<=', '=>', '>']
const operators_dictionary = Object.assign({},...operators.map( o => { return {[o]: true} } ))
const operators_map = new Map( operators.map( o => [ o, true ] ) )

const regex = new RegExp('^(' 
    + operators.map(o => `\\${o}`).join('|') 
    + ')$')


// test one - regex
function test_one() {

    const o = operators[Math.floor(Math.random()*5)]

    if ( o.match(regex) ) {
        return true
    }
}

// test two - dictionary lookup
function test_two_a() {
    const o = operators[Math.floor(Math.random()*5)]
    // console.log(o)

    if ( operators_dictionary[o] ) {
        return true
    }
}


// test two - dictionary in
function test_two_b() {
    const o = operators[Math.floor(Math.random()*5)]

    if ( o in operators_dictionary ) {
        return true
    }
}

// test three - array includes
function test_three() {
    const o = operators[Math.floor(Math.random()*5)]

    if ( operators.includes(o) ) {
        return true
    }
}

// test four - if with "|" operator
function test_four() {
    const o = operators[Math.floor(Math.random()*5)]

    if ( o=='='||o=='!='||o=='<'||o=='<='||o=='=>'||o=='>' ) {
        return true
    }
}

// test five - map
function test_five() {
    const o = operators[Math.floor(Math.random()*5)]

    if ( operators_map.has(o) ) {
        return true
    }
}

const revolutions = 100000;

const tests = [
    [ test_one, 'Regex' ],
    [ test_two_a, 'Dictionary - attribute'],
    [ test_two_b, 'Dictionary - in'],
    [ test_three, 'Array - includes'],
    [ test_four, 'if statement and | operator' ],
    [ test_five, 'map']
]

console.log(`${revolutions.toLocaleString()} revolutions`)
console.log("***** RUNNING ***********************************************")

for ( const test of [...tests].sort( (a,b) => Math.floor(Math.random()*1000) - Math.floor(Math.random()*1000) ) ) {
    const [ func, label ] = test

    const start_time = microtime.now()
    process.stdout.write(`   ${label}... `.padEnd(57))
    for ( let i = 0; i < revolutions; i++ ) {
        func.call()
    }
    const end_time = microtime.now()
    console.log("Done")

    const total_time = end_time - start_time;
    const time_per_revolution = total_time / revolutions;

    const results = {
        start_time,
        end_time,
        total_time,
        time_per_revolution,
        revolutions
    }

    test[2] = results
}
console.log("")


function printTestRow( test ) {
    const [ func, label ] = test
    const {
        start_time,
        end_time,
        total_time,
        time_per_revolution,
        revolutions
    } = test[2]
    
    console.log(`  ${label.padEnd(40)}` + `${total_time}ms`.padEnd(12) + `${time_per_revolution}ms`.padEnd(12) )
}

console.log("***** RESULTS ***********************************************")
tests.map( printTestRow )
console.log("")

console.log("***** FASTEST ***********************************************")
tests.sort( (a,b) => a[2].time_per_revolution - b[2].time_per_revolution ).map(printTestRow)
console.log("")




