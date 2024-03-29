

// @Api({
//     modules: [
//         UsersModule
//     ],
//     // database: {
//     //
//     // },
//     // databases: [
//     //     { }
//     // ],
//     // orm: ...orm instance...
// })
// export class FooApi { }
//
//


import { buildExpressApplication } from './cruft';

const PORT=3200

async function main() {

    const app = await buildExpressApplication()

    /** Start the server **/
    app.listen( PORT, () => {
        console.log(`Server started on port http://localhost:${ PORT }/api`)
    } )

}

main()

