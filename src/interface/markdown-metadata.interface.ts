/**
 * Metadata from markdown content
 *
 * You can write metadata as YAML by defining them at the top of the file wrapped by three dashes `---`
 *
 * Example:
 *
 * ```md
 * ---
 * title: Backend Engineer
 * id: 101
 * locations: [India, Remote]
 * department: Engineering
 * publishDate: 2020-06-27T13:53:26.714Z
 * tags: [NodeJs, AWS, Serverless, TypeScript]
 * isDraft: true
 * ---
 * ```
 */
export interface MarkdownMetadata {
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | Date
    | Date[]
    | Record<string, unknown>
    | Record<string, unknown>[];
}
