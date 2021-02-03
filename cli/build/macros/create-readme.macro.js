"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReadmeMacro = void 0;
const path = require("path");
const object_1 = require("@agape/object");
const macro_1 = require("../lib/macro");
class CreateReadmeMacro extends macro_1.Macro {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = object_1.deflate(this.scope.project);
            this.scope.templateer.renderFile("README.md", path.join(this.scope.project.path, "README.md"), { project: data });
            // console.log( this.scope )
            // this.scope.renderFile( 'README.md' )
            // this.scope.templateer.renderFile
            // let t = new Templateer( deflate(this.scope) )
            // t.render( 'README.md' )
            // // console.log( this.scope )
            // // console.log( JSON.stringify(this.scope))
            // let context = deflate( this.scope )
            // console.log( context )
            // const filepath = path.join( __dirname, '..', 'templates', 'README.md' );
            // const text = fs.readFileSync( filepath, "utf-8" );
            // const template = handlebars.compile(text);
            // fs.writeFileSync( path.join( this.scope.project.path, 'README.md'), template(context) );
        });
    }
}
exports.CreateReadmeMacro = CreateReadmeMacro;
