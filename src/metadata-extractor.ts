import { safeLoad } from 'js-yaml';

import { MarkdownMetadata, MarkdownMetadataContent } from './interface';

/** *
 * Extract the metadata from the content
 *
 * The metadata should be wrapped with the delimiter
 */
export function extract(contents: string, delimiter = '---'): MarkdownMetadataContent {
  const ZERO = 0;
  let startIndex = ZERO;
  let endIndex = ZERO;
  let metadata = {};

  const input = contents.trim();

  if (input.indexOf(delimiter) === ZERO) {
    startIndex = input.indexOf(delimiter) + delimiter.length;
    endIndex = input.indexOf(delimiter, startIndex);

    const mdMetadata = input.substring(startIndex, endIndex);

    metadata = safeLoad(mdMetadata) as MarkdownMetadata;
    endIndex += delimiter.length;
  }

  const content = input.substring(endIndex).trim();

  return { metadata, content };
}
