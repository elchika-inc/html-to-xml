export interface HtmlToXmlOptions {
    includeTitle?: boolean;
    title?: string;
}
export declare class HtmlToXmlConverter {
    /**
     * Convert HTML content to XML format
     */
    static convert(html: string, options?: HtmlToXmlOptions): string;
    /**
     * Convert to XML format with structured content
     */
    private static toXML;
}
