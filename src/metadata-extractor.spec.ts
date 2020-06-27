import { extract } from './metadata-extractor';

const version = 0.1;

const markdownWithoutMetadataInput = `
# Heading
Hello world

## Sub heading

Links should https://google.com auto convert to anchor tags

## List

- Item 1
- Item 2
`;

const markdownWithMetadataInput = `
---
title: Markdown Parser
tags: [markdown, parser, ${version}]
---

${markdownWithoutMetadataInput}
`;

describe('Metadata Extractor', () => {
  it('should be defined', () => {
    expect(typeof extract).toEqual('function');
  });

  it('should pass without parsing metadata if none exists', () => {
    const { content, metadata } = extract(markdownWithoutMetadataInput);

    expect(metadata).toBeDefined();
    expect(metadata).toEqual({});

    expect(content).toBeDefined();
    expect(content).toEqual(markdownWithoutMetadataInput.trim());
  });

  it('should extract metadata', () => {
    const { content, metadata } = extract(markdownWithMetadataInput);

    expect(metadata).toBeDefined();
    expect(metadata.title).toEqual('Markdown Parser');
    expect(metadata.tags).toEqual(['markdown', 'parser', version]);

    expect(content).toBeDefined();
    expect(content).toEqual(markdownWithoutMetadataInput.trim());
  });
});
