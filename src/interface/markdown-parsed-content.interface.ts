/**
 * The parsed content from markdown data based on the DOM selectors passed in the options.
 *
 * The markdown is first converted into html and then it is parsed to extract these data.
 * The parsed content can be configured to be either extracted as HTML string or Text string.
 */
export interface MarkdownParsedContent {
  [key: string]: string | null;
}
