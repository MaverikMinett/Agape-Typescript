import { Command } from '../lib/command';
export declare class StartCommand extends Command {
    run(): Promise<void>;
    displayBanner(): void;
}
