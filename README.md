<h1 align="center">Markdown Extractor</h1>
<h5 align="center">Your one stop for parsing Markdown content. Give your markdown superpower by adding metadata.</h5>

<div align="center">

[![Maintainability](https://api.codeclimate.com/v1/badges/e5cb09b9bff5b857a673/maintainability)](https://codeclimate.com/github/sohailalam2/markdown-extractor/maintainability)
[![npm](https://badgen.net/npm/v/@sohailalam2/markdown-extractor?icon=npm)](https://www.npmjs.com/package/@sohailalam2/markdown-extractor)
[![github actions](https://github.com/sohailalam2/markdown-extractor/workflows/Build%20&%20Test/badge.svg?branch=master)](https://github.com/sohailalam2/markdown-extractor/actions)
[![gzip size](https://badgen.net/badgesize/gzip/https://cdn.jsdelivr.net/npm/@sohailalam2/markdown-extractor/dist/bundle.min.js)](https://cdn.jsdelivr.net/npm/@sohailalam2/markdown-extractor/dist/bundle.min.js)
[![install size](https://badgen.net/packagephobia/install/@sohailalam2/markdown-extractor?icon=packagephobia)](https://packagephobia.now.sh/result?p=@sohailalam2/markdown-extractor)
[![snyk](https://snyk.io/test/npm/@sohailalam2/markdown-extractor/badge.svg)](https://snyk.io/test/npm/@sohailalam2/markdown-extractor)

</div>

## 📢 Features

- Parse markdown content. We use [marked](https://github.com/markedjs/marked)
- Extract YAML metadata information about your markdown content. We use [js-yaml](https://github.com/nodeca/js-yaml)
- Convert markdown to HTML and easily extract data from DOM nodes by passing selectors. We use [cheerio](https://github.com/cheeriojs/cheerio)
- Support for both NodeJS and Browser
- Browser standalone package also available at `dist/bundle.min.js`

## 💡 How does it work?

For example,

```md
---
title: Awesome Markdown Extractor
id: 101
---

# Abstract

Lorem ipsum dolor...
```

would be parsed as

```js
{
  metadata: {
    title: "Awesome Markdown Extractor",
    id: 101
  },
  content: {
    abstract: 'Abstract'
  },
  html: "<h1>Abstract</h1>...."
}
```

## 💻 Installation

```bash
$ npm install @sohailalam2/markdown-extractor
```

## ✅ Usage

Check [`example`](./example) for more information.

Given the sample markdown content, lets see how we can parse it and extract the metadata information

```md
---
title: Backend Engineer
id: 101
locations: [India, Remote]
department: Engineering
publishDate: 2020-06-27T13:53:26.714Z
tags: [NodeJs, AWS, Serverless, TypeScript]
isDraft: true
---

# Backend Engineer

## Abstract

This is the awesome _abstract_ for the **backend engineering** role. Visit https://github.com to checkout our brand and some amazing content.

## Preferred Qualifications

- AWS experience
- Serverless experience

## Perks

- Industry standard salary
- Awesome team
- Freedom and responsibilities

## Other Details

This is an **amazing** opportunity for _budding engineers_. Apply now!!
```

```js
const fs = require('fs');
const path = require('path');

const { parseMarkdown } = require('@sohailalam2/markdown-extractor');

const markdown = fs.readFileSync(path.join(__dirname, 'job-backend-engineer.md'), 'utf8');

const options = {
  selectors: [
    { selector: '#abstract', parseHtml: true },
    { selector: '#preferred-qualifications' },
    { selector: '#perks', parseHtml: true },
  ],
};

const { metadata, content, html } = parseMarkdown(markdown, options);

// metadata:
//
// {
//   title: 'Backend Engineer',
//   id: 101,
//   locations: [ 'India', 'Remote' ],
//   department: 'Engineering',
//   publishDate: 2020-06-27T13:53:26.714Z,
//   tags: [ 'NodeJs', 'AWS', 'Serverless', 'TypeScript' ],
//   isDraft: true
// }

const abstract = content['#abstract'];
// <p>This is the awesome <em>abstract</em> for the <strong>backend engineering</strong> role. Visit <a href="https://github.com">https://github.com</a> to checkout our brand and some amazing content.</p>

const preferredQualifications = content['#preferred-qualifications'].split('\n');
// [ 'AWS experience', 'Serverless experience' ]

const perks = content['#perks'];

// <ul>
// <li>Industry standard salary</li>
// <li>Awesome team</li>
// <li>Freedom and responsibilities</li>
// </ul>
```

## 🌍 Standalone library for the browser

```html
<script src="../dist/bundle.min.js"></script>

<script>
  // ...

  const { metadata, content, html } = MarkdownExtractor.parseMarkdown(markdown, options);

  // ...
</script>
```

## 🔨 Configuration Options

The `parseMarkdown` function takes one required parameter (markdown as string) and an optional parameter for configuring the parser:

```ts
function parseMarkdown(data: string, options?: MarkdownExtractorOptions): MarkdownExtractorResult {}
```

The various options and its effects are described as below:

### options.metadataDelimiter

The delimiter boundary that holds the metadata content. It defaults to `---`.

Example:

```md
---
title: Awesome Markdown Extractor
id: 101
---
```

### options.selectors

This is an array of `MarkdownDomSelector` containing two properties. If provided, the parser will parse the markdown to HTML and also selectively extract data out of the DOM elements selected by the provided selectors.

- `selector` (string) is a jQuery style DOM selector
- `parseHtml` (boolean, optional) indicating whether to extract the content of the selected DOM element as HTML or as Text. Defaults to text.

Example:

```js
const selectors = [
  { selector: '#abstract', parseHtml: true },
  { selector: '#preferred-qualifications' },
  { selector: '#perks', parseHtml: true },
];
```

### options.cheerioOptions

Internally we use [cheerio](https://github.com/cheeriojs/cheerio) to parse the HTML content and extract data using DOM selectors. You can optionally configure its behavior using this parameter. Read more [here](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cheerio/index.d.ts#L226)

## 📌 Links

- [`Changelog`](./CHANGELOG.md)
- [`Contributing`](./CONTRIBUTING.md)
- [Annotated code documentation](https://sohailalam2.github.io/markdown-extractor/)
- [Test Coverage](https://sohailalam2.github.io/markdown-extractor/tests/coverage/lcov-report)
- [Allure Report](https://sohailalam2.github.io/markdown-extractor/tests/report)
