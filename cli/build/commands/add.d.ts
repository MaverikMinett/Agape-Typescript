import { Command } from '../lib/command';
export declare class AddCommand extends Command {
    run(): Promise<void>;
    displayBanner(): void;
    addFontToAngularProject(fontName: string): Promise<void>;
    addMaterialIconsToAngularProject(): Promise<void>;
}
