export declare function transformInlineElement(lineText: string): string;
/**
 * Transform markdown text to html element.
 * @param mdText
 * @param options
 * options.indent: default indent px.
 * @returns
 */
export declare function transformer(mdText: string, { indent, }?: {
    indent: number;
}): any;
