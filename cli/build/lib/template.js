"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templateer = void 0;
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
class Templateer {
    constructor(...sources) {
        this.sources = [];
        this.sources = this.sources.concat(sources);
        // this.sources.push( path.join( this.getAppDataDir(), 'templates' ) )
        // this.sources.push( path.join( __dirname, 'templates' ) )
    }
    getAppDataDir() {
        const system_appdata_dir = process.env.APPDATA
            || (process.platform == 'darwin'
                ? process.env.HOME + '/Library/Preferences'
                : process.env.HOME + "/.local/share");
        return path.join(system_appdata_dir, 'agape');
    }
    renderFile(templatePath, outputPath, stash) {
        let sourcePath = this.findTemplate(templatePath);
        if (!sourcePath) {
            throw new Error(`Cannot find template ${sourcePath} to render ${outputPath}`);
        }
        const source = fs.readFileSync(sourcePath, "utf-8");
        const template = handlebars.compile(source);
        fs.writeFileSync(outputPath, template(stash));
    }
    findTemplate(template) {
        for (let source of this.sources) {
            let sourcefile = path.resolve(path.join(source, template));
            if (fs.existsSync(sourcefile))
                return sourcefile;
        }
    }
}
exports.Templateer = Templateer;
// export class TemplateEngine {
// 	public sources: Array<string>
// 	constructor( ...sources ) {
// 		this.sources = [ ]
// 		this.sources = this.sources.concat( sources )
// 		this.sources.push( path.join( this.getAppDataDir(), 'templates' ) )
// 		this.sources.push( path.join( __dirname, 'templates' ) )
// 		// console.log( this.sources )
// 	}
// 	getAppDataDir( ) {
// 			const system_appdata_dir = process.env.APPDATA 
// 			|| ( process.platform == 'darwin' 
// 					? process.env.HOME + '/Library/Preferences' 
// 					: process.env.HOME + "/.local/share" )
// 			return path.join( system_appdata_dir, 'agape' );
// 	}
// 	async getCompositeTemplateList( templateDirectory:string ) {
// 		var results = new Map ( )
// 		// console.log( 'getCompositTemplateList' )
// 		for ( let source of this.sources ) {
//      		const absoluteSource = path.resolve( source )
// 			const absoluteTemplateDirectory = path.join( absoluteSource, templateDirectory )
// 			// console.log( absoluteTemplateDirectory )
// 			if ( fs.existsSync( absoluteTemplateDirectory ) ) {
// 				const globify = util.promisify( glob )
// 				await globify(absoluteTemplateDirectory + '/**/*')
// 					.then( ( globbed ) => {
// 						let stripChars = absoluteTemplateDirectory.length
// 						results[absoluteTemplateDirectory] = new Map( 
// 							globbed.map( fullPath => {
// 								let shortPath = fullPath.substring(stripChars);
// 								return [ shortPath, fullPath ];
// 							}) 
// 						)
// 					} )
// 			}
// 		}
// 		// console.log( results['/home/maverik/op/sandbox/ag-cli/dist/templates/ui'] )
// 		// for (let key of results.keys()) {
// 		// 	console.log(key);                   //Lokesh Raj John
// 		// }
// 	}
// 	// findTemplate( templatePath:string ) {
// 	// }
// 	renderPath( templatePath:string, outputPath: string, stash: object ) {
// 		const files = this.getCompositeTemplateList( templatePath )
// 	}
// 	// renderFile( templatePath:string, outputPath: string, stash:object ) {
// 	// }
// 	// render( templateFilePath:string ): string {
// 	// }
// }
