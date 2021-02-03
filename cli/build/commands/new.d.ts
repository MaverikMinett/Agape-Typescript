import { Command } from '../lib/command';
export declare class NewCommand extends Command {
    run(): Promise<void>;
    prompt(): Promise<{}>;
    displayBanner(): void;
    promptForProjectType(): Promise<object>;
}
