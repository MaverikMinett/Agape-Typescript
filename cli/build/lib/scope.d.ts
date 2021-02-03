import { Templateer } from '@agape/templateer';
import { ProjectDescriptor } from './descriptors';
import { Settings } from './settings';
/**
 * Cli application state
 */
export declare class Scope {
    stash: {
        [key: string]: any;
    };
    project: ProjectDescriptor;
    settings: Settings;
    templateer: Templateer;
    /**
     * @param stash For holding user responses and temporary data
     */
    constructor(project?: ProjectDescriptor, stash?: {
        [key: string]: any;
    });
    _build_templateer(): Templateer;
    renderFile(filepath: string, outpath?: string): void;
}
