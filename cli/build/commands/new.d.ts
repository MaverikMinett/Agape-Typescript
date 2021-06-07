import { NewAngularProjectCommand } from '../projects/angular/commands/new';
import { NewDjangoProjectCommand } from '../projects/django/commands/new';
export declare class NewCommand {
    run(args?: Array<string>): Promise<void>;
    getHandler(projectType: string): NewAngularProjectCommand | NewDjangoProjectCommand;
    promptForProjectType(): Promise<string>;
}
