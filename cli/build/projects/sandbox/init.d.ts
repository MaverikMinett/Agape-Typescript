import { Command } from '../../lib/command';
export declare class InitSandboxCommand extends Command {
    run(): Promise<void>;
    prompt(stash: any): any;
}
