import { load } from 'cheerio';
import marked from 'marked';

import {
  MarkdownParsedContent,
  MarkdownMetadataContent,
  MarkdownExtractorResult,
  MarkdownExtractorOptions,
} from './interface';

import { extract } from './metadata-extractor';

const defaultOptions: MarkdownExtractorOptions = {
  selectors: [],
  metadataDelimiter: '---',
  cheerioOptions: {
    ignoreWhitespace: true,
    lowerCaseTags: true,
    lowerCaseAttributeNames: true,
    xmlMode: false,
  },
};

/**
 * Parse a markdown text and extract parts of it using DOM selectors.
 * The markdown can also contain a metadata section on top which will be extracted separately as a metadata section
 *
 * @param data Markdown text as string
 * @param options Markdown extractor options
 * @param options.selectors An array of jquery style dom selectors for which data will be automatically extracted
 *                          from the markdown. Extraction can be done as html or text only.
 * @param options.metadataDelimiter The delimiter demarking the metadata section of the markdown. Defaults to `---`
 * @param options.cheerioOptions Internally we use cheerio to parse the html.
 *                               You can freely configure it by setting the options here.
 */
export function parseMarkdown(data: string, options?: MarkdownExtractorOptions): MarkdownExtractorResult {
  const opt: MarkdownExtractorOptions = {
    selectors: options?.selectors || [],
    metadataDelimiter: options?.metadataDelimiter || defaultOptions.metadataDelimiter,
    cheerioOptions: { ...defaultOptions.cheerioOptions, ...(options?.cheerioOptions || {}) },
  };

  const parsed: MarkdownMetadataContent = extract(data, opt.metadataDelimiter);
  const html: string = marked(parsed.content);
  const $ = load(html, opt.cheerioOptions);

  const content: MarkdownParsedContent = opt.selectors
    .map(domSelector => {
      const { selector, parseHtml } = domSelector;

      if (parseHtml) {
        const parsedContent = $.html($(selector).next());

        return {
          selector,
          content: parsedContent,
        };
      }

      return {
        selector,
        content: $(selector).next().text().trim(),
      };
    })
    .reduce((obj, val) => {
      Object.assign(obj, { [val.selector]: val.content });

      return obj;
    }, {} as MarkdownParsedContent);

  return {
    metadata: parsed.metadata,
    content,
    html,
  };
}
