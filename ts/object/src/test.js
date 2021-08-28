"use strict";
// Import stylesheets
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var include_1 = require("./lib/decorators/include");
var appDiv = document.getElementById('app');
/**
 * Example of the initial value of a property not being
 * carried into the consuming class
 */
var ATrait = /** @class */ (function () {
    function ATrait() {
        this.foo = 'bar';
    }
    return ATrait;
}());
var AClass = /** @class */ (function () {
    function AClass() {
    }
    AClass = __decorate([
        include_1.include(ATrait)
    ], AClass);
    return AClass;
}());
var o = new AClass();
/* result is undefined, not 'bar'' */
appDiv.innerHTML = "" + o.foo;
