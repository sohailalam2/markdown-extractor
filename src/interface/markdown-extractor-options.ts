import { MarkdownDomSelector } from './markdown-dom-selector';

export interface CheerioOptionsInterface {
  // Document References
  // Cheerio https://github.com/cheeriojs/cheerio
  // HTMLParser2 https://github.com/fb55/htmlparser2/wiki/Parser-options
  // DomHandler https://github.com/fb55/DomHandler

  xmlMode?: boolean;
  decodeEntities?: boolean;
  lowerCaseTags?: boolean;
  lowerCaseAttributeNames?: boolean;
  recognizeCDATA?: boolean;
  recognizeSelfClosing?: boolean;
  normalizeWhitespace?: boolean;
  withStartIndices?: boolean;
  withEndIndices?: boolean;
  ignoreWhitespace?: boolean;
  _useHtmlParser2?: boolean;
}

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
