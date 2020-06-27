import { MarkdownMetadata } from './markdown-metadata.interface';
import { MarkdownParsedContent } from './markdown-parsed-content.interface';

/**
 * Markdown parser result
 *
 * metadata - The extracted metadata (if any)
 * content - The extracted content (based on the passed selectors)
 * html - The raw html content generated from the markdown
 */
export interface MarkdownExtractorResult {
  metadata: MarkdownMetadata;
  content: MarkdownParsedContent;
  html: string;
}
