export declare class FontDownloader {
    retrieveFont(url: string): Promise<void>;
    downloadFont(): Promise<void>;
    parseFontSourcesFromStylesheet(css: string, format: string): Promise<void>;
    retrieveFontStylesheet(sourceUrl: string, format: string): Promise<any>;
    getUserAgentForFormat(format: string): Promise<"Mozilla/5.0 (compatible; MSIE 9.0; InfoChannel RNSafeBrowser/v.1.1.0G)" | "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240" | "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36">;
}
