import { Project } from '../projects/project';
import { StartAngularProjectCommand } from '../projects/angular/commands/start';
import { StartDjangoProjectCommand } from '../projects/django/commands/start';
export declare class StartCommand {
    run(args?: Array<string>): Promise<void>;
    getHandler(project: Project): StartAngularProjectCommand | StartDjangoProjectCommand;
}
