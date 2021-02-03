import { Scope } from './scope';
import { LazyScope } from './traits';
export interface Command extends LazyScope {
}
export declare class Command {
    constructor(scope?: Scope);
    run(): void;
}
