export declare function transformInlineElement(lineText: string): string;
export interface TransformOptions {
    output?: 'options' | 'dom';
    indent?: number;
}
/**
 * Transform markdown text to html element.
 * @param mdText
 * @param options
 * options.indent: default indent px.
 * @returns
 */
export declare function transform(mdText: string, transformOptions: TransformOptions): any;
