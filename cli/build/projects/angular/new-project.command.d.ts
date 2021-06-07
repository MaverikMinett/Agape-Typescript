import { Command } from '../../lib/command';
import { ProjectDescriptor } from '../../lib/descriptors';
export declare class NewAngularProjectCommand extends Command {
    run(): Promise<void>;
    promptForProjectOptions(): Promise<{
        name: string;
        slug: string;
        angular: {};
        license: any;
        author: any;
        email: any;
        port: string;
    }>;
    promptForAngularOptions(): Promise<any>;
    addMaterialIcons(): Promise<void>;
    writeProjectFile(projectDescriptor: ProjectDescriptor): Promise<void>;
}
