/**
 * Markdown DOM selector
 *
 * selector - any HTML jquery like selector
 * parseHtml - whether to parse the content as html or text
 */
export interface MarkdownDomSelector {
  selector: string;
  parseHtml?: boolean;
}
