import { MarkdownDomSelector } from './markdown-dom-selector';

/**
 * Markdown Extractor config options
 *
 * selectors - The jquery start DOM selectors
 * metadataDelimiter - The delimiter boundary that holds the metadata content
 * cheerioOptions - The cheerio options for parsing html content
 * sanitizeHtmlOptions - The sanitize-html options for sanitizing html content
 */
export interface MarkdownExtractorOptions {
  selectors: MarkdownDomSelector[];
  metadataDelimiter?: string;
  cheerioOptions?: CheerioOptionsInterface;
}
