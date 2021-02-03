import { Command } from '../../lib/command';
import { ProjectDescriptor } from '../../lib/descriptors';
export declare class NewDjangoProjectCommand extends Command {
    run(): Promise<void>;
    promptForProjectOptions(): Promise<{
        name: string;
        slug: string;
        django: {
            primaryModule: string;
        };
        license: any;
        author: any;
        email: any;
        port: string;
    }>;
    promptForDjangoOptions(): Promise<any>;
    writeProjectFile(projectDescriptor: ProjectDescriptor): Promise<void>;
}
