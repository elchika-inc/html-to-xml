import * as cheerio from 'cheerio';
import { ContentExtractor } from '@elchika-inc/shared';
export class HtmlToXmlConverter {
    /**
     * Convert HTML content to XML format
     */
    static convert(html, options = {}) {
        const $ = cheerio.load(html);
        return this.toXML($, options);
    }
    /**
     * Convert to XML format with structured content
     */
    static toXML($, options) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<document>\n';
        if (options.includeTitle && options.title) {
            xml += `  <title><![CDATA[${options.title}]]></title>\n`;
        }
        xml += '  <content>\n';
        // Extract structured content using shared utility
        const structured = ContentExtractor.extractStructuredContent($);
        // Add headings
        if (structured.headings.length > 0) {
            xml += '    <headings>\n';
            structured.headings.forEach(heading => {
                xml += `      <heading level="${heading.level}"><![CDATA[${heading.text}]]></heading>\n`;
            });
            xml += '    </headings>\n';
        }
        // Add paragraphs
        if (structured.paragraphs.length > 0) {
            xml += '    <paragraphs>\n';
            structured.paragraphs.forEach(paragraph => {
                xml += `      <paragraph><![CDATA[${paragraph}]]></paragraph>\n`;
            });
            xml += '    </paragraphs>\n';
        }
        // Add links
        if (structured.links.length > 0) {
            xml += '    <links>\n';
            structured.links.forEach(link => {
                xml += `      <link url="${link.url}"><![CDATA[${link.text}]]></link>\n`;
            });
            xml += '    </links>\n';
        }
        // Add images
        if (structured.images.length > 0) {
            xml += '    <images>\n';
            structured.images.forEach(image => {
                xml += `      <image src="${image.src}" alt="${image.alt}"/>\n`;
            });
            xml += '    </images>\n';
        }
        // Add lists
        if (structured.lists.length > 0) {
            xml += '    <lists>\n';
            structured.lists.forEach(list => {
                xml += `      <list type="${list.type}">\n`;
                list.items.forEach(item => {
                    xml += `        <item><![CDATA[${item}]]></item>\n`;
                });
                xml += '      </list>\n';
            });
            xml += '    </lists>\n';
        }
        xml += '  </content>\n';
        xml += '</document>';
        return xml;
    }
}
