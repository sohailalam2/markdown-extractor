import { MarkdownMetadata } from './markdown-metadata.interface';

/**
 * The parsed metadata and raw markdown content beyond the metadata placeholder
 */
export interface MarkdownMetadataContent {
  metadata: MarkdownMetadata;
  content: string;
}
