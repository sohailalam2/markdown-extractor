import { parseMarkdown } from './extractor';

import { MarkdownExtractorOptions } from './interface';

const ZERO = 0;

const markdownInput = `
---
title: Markdown Parser
tags: [markdown, parser, ${ZERO}]
---

# Heading
Hello world

## Sub heading

Links should https://google.com auto convert to anchor tags

## List

- Item 1
- Item 2
`;

const options: MarkdownExtractorOptions = {
  selectors: [
    { selector: '#heading' },
    { selector: '#sub-heading', parseHtml: true },
    { selector: '#list', parseHtml: true },
  ],
};

describe('Markdown Parser', () => {
  it('should be defined', () => {
    expect(typeof parseMarkdown).toEqual('function');
  });

  it('should return metadata and html without parsing if selectors are not passed as options', () => {
    const { metadata, html } = parseMarkdown(markdownInput);

    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(ZERO);

    expect(metadata).toEqual({ title: 'Markdown Parser', tags: ['markdown', 'parser', ZERO] });
  });

  it('should parse markdown as metadata, html and text', () => {
    const { metadata, html, content: parsedContent } = parseMarkdown(markdownInput, options);
    const { '#heading': headingContent, '#sub-heading': subHeadingContent, '#list': listContent } = parsedContent;

    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(ZERO);

    expect(metadata).toEqual({ title: 'Markdown Parser', tags: ['markdown', 'parser', ZERO] });

    expect(headingContent).toEqual('Hello world');
    expect(subHeadingContent).toEqual(
      '<p>Links should <a href="https://google.com">https://google.com</a> auto convert to anchor tags</p>',
    );
    expect(listContent).toEqual(`<ul>
<li>Item 1</li>
<li>Item 2</li>
</ul>`);
  });
});
