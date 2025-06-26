export interface StructuredContent {
    headings: Array<{
        level: number;
        text: string;
    }>;
    paragraphs: string[];
    links: Array<{
        text: string;
        url: string;
    }>;
    images: Array<{
        alt: string;
        src: string;
    }>;
    lists: Array<{
        type: 'ordered' | 'unordered';
        items: string[];
    }>;
}
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
    /**
     * Extract structured content from HTML (reuse logic from JSON converter)
     */
    private static extractStructuredContent;
}
