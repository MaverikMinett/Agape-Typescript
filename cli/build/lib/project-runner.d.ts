import { Scope } from './scope';
export declare class ProjectRunner {
    scope: Scope;
    constructor(scope: Scope);
    run(): Promise<void>;
}
