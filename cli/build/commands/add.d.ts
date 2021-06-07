import { Project } from '../projects/project';
import { AddToAngularProjectCommand } from '../projects/angular/commands/add';
export declare class AddCommand {
    run(args?: Array<string>): Promise<void>;
    getHandler(project: Project): AddToAngularProjectCommand;
}
