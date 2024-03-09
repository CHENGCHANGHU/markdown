import { createElement } from '@golden-tiger/dom';

const BasicMarkdownStyle = {
  tag: 'style',
  text: `
    [data-md] {
      line-height: 1.5;
    }

    [data-md-heading='h1'] {
      padding: 32px 0 16px 0;
    }

    [data-md-heading='h2'] {
      padding: 24px 0 8px 0;
    }

    [data-md-heading='h3'] {
      padding: 16px 0 0 0;
    }

    [data-md-block-quotes='block-quotes'] {
      margin-left: var(--indent);
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 4px 8px;
      border-left: 4px solid #ddd;
      background-color: #eee;
    }
    
    table, th,
    [data-md-table-data-cell='td'] {
      border: 1px solid #343434;
    }
    
    table {
      border-collapse: collapse;
      border-spacing: 0px;
      margin: 8px 0 8px 0;
    }
    
    tr:nth-child(1) {
      background-color: #dedede;
      font-weight: 700;
    }
    
    th, td {
      padding: 4px 8px;
    }
    
    a {
      color: seagreen;
    }

    [data-md-inline-code='inline-code'] {
      border: 1px solid #ccc;
      padding: 0 2px;
      border-radius: 4px;
      background-color: #e3e3e3;
    }
    
    [data-md-unordered-list-item='list-item'] {
      margin: 8px 0;
      margin-left: var(--indent);
    }

    [data-md-code-block='code-block'] {
      display: flex;
      flex-flow: row nowrap;
      column-gap: 4px;
      margin: 8px 0;
      padding: 8px 16px;
      border-radius: 4px;
      background-color: #eee;
      box-sizing: border-box;
      max-height: 400px;
      overflow-y: auto;
    }

    [data-md-code-block-line-box='code-block-line-box'],
    [data-md-code-block-code-box='code-block-code-box'] {
      padding: 4px 0;
      height: 100%;
      color: #ccc;
      font-family: monospace;
      white-space: pre;
    }

    [data-md-code-block-line-box='code-block-line-box'] {
      color: #343434;
      text-align: right;
    }

    [data-md-code-block-code-box='code-block-code-box'] {
      flex: 1;
      padding-left: 4px;
      border-radius: 4px;
      background-color: #222;
    }

    [data-md-figure='figure'] {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      row-gap: 8px;
    }

    [data-md-image='image'] {
      width: 80%;
      max-height: 600px;
      object-fit: scale-down;
    }

    [data-md-figcaption="figcaption"] {
      color: #666;
    }

    [data-md-ordered-list='ordered-list'] {
      margin: 8px 0;
      margin-left: var(--indent);
    }

    [data-md-ordered-list-item='ordered-list-item'] {
      list-style-position: inside;
    }

    [data-md-paragraph='paragraph'] {
      margin: 8px 0;
    }
  `,
};

function transformAngleBrackets(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function transformNonInlineCodeText(text: string): string {
  return text
    .replace(/<(?!(\/?(p|pre|code|div|strong|em|table|thead|tbody|th|tr|td)>))/g, '&lt;')
    .replace(/(?<!<(p|pre|code|div|strong|em|table|thead|tbody|th|tr|td))>/g, '&gt;')
    .replace(
      /(?<!\\)\*(?<!\\)\*(.+?)(?<!\\)\*(?<!\\)\*/g,
      (match, m_strong) => `<strong data-md-strong='strong'>${m_strong}</strong>`
    )
    .replace(
      /(?<!\\)\*(.+?)(?<!\\)\*/g,
      (match, m_italic) => `<i data-md-italic='italic'>${m_italic}</i>`
    )
    .replace(
      /(?<!\\)!(?<!\\)\[(.+?)(?<!\\)\](?<!\\)\((.+?)(?<!\\)\)/g,
      (match, m_alt, m_url) => `<figure data-md-figure="figure">
        <img src="${m_url}" alt="${m_alt}" data-md-image="image">
        <figcaption data-md-figcaption="figcaption">${m_alt}</figcaption>
      </figure>`
    )
    .replace(
      /(?<!\\)\[(.+?)(?<!\\)\](?<!\\)\((.+?)(?<!\\)\)/g,
      (match, m_text, m_url) => `<a href="${m_url}" target="_blank" data-md-link='link'>${m_text}</a>`
    );
}

export function transformInlineElement(lineText: string) {
  const results = lineText.split('`');
  const { length } = results;
  if (length < 3) {
    return transformNonInlineCodeText(lineText);
  }

  if ((length & 1) === 1) {
    return results.reduce((acc, curr, index) => {
      if ((index & 1) === 0) {
        acc += transformNonInlineCodeText(curr);
      } else {
        acc += `<code data-md-inline-code='inline-code'>${transformAngleBrackets(curr)}</code>`;
      }
      return acc;
    }, '');
  }
  
  return results.slice(0, -2).reduce((acc, curr, index) => {
    if ((index & 1) === 0) {
      acc += transformNonInlineCodeText(curr);
    } else {
      acc += `<code data-md-inline-code='inline-code'>${curr}</code>`;
    }
    return acc;
  }, '')
    + transformNonInlineCodeText(results[length - 2])
    + '`'
    + transformNonInlineCodeText(results[length - 1]);
}

function getLinesChar(mdText: string) {
  const markdownLines = [];
  let row = 0;
  let pos = 0;
  let lineText = '';
  let skipNextFlag = false;

  mdText = mdText.replaceAll(/\r\n/g, '\n').replaceAll(/\r/g, '\n');

  // windows: \r\n, linux: \n, mac: \r
  for (let char of mdText) {
    if (skipNextFlag) {
      markdownLines.push(lineText);
      markdownLines.push('\n');
      lineText = '';
      pos++;
      skipNextFlag = false;
      continue;
    }

    // when char is multi-bytes, [pos] will cause error
    if (mdText[pos] === '\r' && mdText[pos + 1] === '\n') {
      skipNextFlag = true;
      pos++;
      continue;
    }

    if (char === '\n' || char === '\r') {
      markdownLines.push(lineText);
      markdownLines.push('\n');
      lineText = '';
      row++;
      pos++;
      continue;
    }
    lineText += char;
    pos++;
  }
  markdownLines.push(lineText);
  return markdownLines;
}

function getLines(mdText: string) {
  let markdownLines = mdText
    .replaceAll(/\r\n/g, '\n')
    .replaceAll(/\r/g, '\n')
    .split(/\n/)
    .reduce((lines, curr) => {
        lines.push(curr, '\n');
        return lines;
      }, []);
  markdownLines.pop();
  return markdownLines;
}

const DefaultTransformOptions: TransformOptions = {
  indent: 16,
  output: 'dom'
};

export interface TransformOptions {
  output?: 'options' | 'dom';
  indent?: number;
}

/**
 * Transform markdown text to html element.
 * @param mdText 
 * @param options
 * options.indent: indent px, default 16.
 * options.output: 'options' | 'dom', default 'dom'.
 * @returns 
 */
export function transform(
  mdText: string,
  transformOptions?: TransformOptions,
) {
  const { output, indent } = {
    ...DefaultTransformOptions,
    ...transformOptions,
  };
  const markdownLines = getLines(mdText);

  const htmlNodeOptions = markdownLines.reduce(({options, lastNodeType, status}, lineText, lineIndex) => {
    let match = null;

    /**
     * code-block-start
     */
    if (match = lineText.match(/^(\s*)```([^`]*)$/)) {
      const [m_whole, m_space, m_language] = match;
      if (lastNodeType !== 'code-block-start') {
        options.push({
          tag: 'div',
          attributes: {
            classes: `code-block-index-${lineIndex}`,
            style: `--indent: ${m_space.length * 16}px`,
            'data-md': '',
            'data-md-code-block': 'code-block',
            'data-md-code-block-type': m_language,
            'data-md-code-block-index': lineIndex,
          },
          children: [
            {
              tag: 'pre',
              text: '',
              attributes: {
                classes: `code-block-index-${lineIndex}-line-box`,
                'data-md': '',
                'data-md-code-block-line-box': 'code-block-line-box',
              },
            },
            {
              tag: 'pre',
              text: '',
              attributes: {
                classes: `code-block-index-${lineIndex}-code-box`,
                'data-md': '',
                'data-md-code-block-code-box': 'code-block-code-box',
              },
            },
          ],
        });
        return { options, lastNodeType: 'code-block-start', status: { skipNextLine: true } };
      }
    }

    /**
     * code-block-end
     */
    if (match = lineText.match(/^(\s*)```(\s*)$/)) {
      if (lastNodeType === 'code-block-start') {
        return { options, lastNodeType: 'code-block-end' };
      }
    }

    /**
     * code-block
     */
    if (lastNodeType === 'code-block-start') {
      if (status && status.skipNextLine) {
        return { options, lastNodeType: 'code-block-start' };
      }
      const { attributes: { ['data-md-code-block-index']: codeIndex }, children: [lineBox, codeBox] } = options.at(-1);
      if (lineText !== '\n') {
        lineBox.text += `${(lineIndex - codeIndex - 2) / 2}:\n`;
      }
      codeBox.text += transformAngleBrackets(lineText);
      return { options, lastNodeType: 'code-block-start' };
    }

    /**
     * split
     */
    if (lineText === '') {
      options.push({
        tag: 'div',
        text: '',
        attributes: {
          'data-md-split-line': 'split-line',
        }
      });
      return {
        options,
        lastNodeType: 'split',
      };
    }

    /**
     * heading
     */
    if (match = lineText.match(/^(#+) (.+?)$/)) {
      const [m_whole, m_sharp, m_text] = match;
      options.push({
        tag: `h${match[1].length}`,
        html: transformInlineElement(m_text.trim()),
        attributes: {
          'data-md': '',
          'data-md-heading': `h${m_sharp.length}`,
        },
      });
      return {
        options,
        lastNodeType: 'heading',
      };
    }

    /**
     * quote
     */
    if (match = lineText.match(/^(\s*)(>+) (.+?)$/)) {
      const lastNodeOption = options[options.length - 1];
      if (lastNodeType === 'quote'
        && match[1].length === lastNodeOption.attributes['data-indent']
      ) {
        lastNodeOption.html += '<br>' + transformInlineElement(match[3].trim());
      } else {
        options.push({
          tag: 'p',
          html: transformInlineElement(match[3].trim()),
          attributes: {
            style: `--indent: ${match[1].length * 16}px`,
            'data-md': '',
            'data-indent': match[1].length,
            'data-md-block-quotes': 'block-quotes',
          },
        });
      }
      return { options, lastNodeType: 'quote' };
    }

    /**
     * tablerow
     * when => lastNodeType === 'tablerow': ||| is valid
     * when => lastNodeType !== 'tablerow': ||| is invalid
     */
    if (match = lineText.match(lastNodeType === 'tablerow' ? /^(\|[^\|]*)+\|$/ : /^(\|[^\|]+)+\|$/)) {
      const lastNodeOption = options[options.length - 1];
      let tableRowIndex = 0;
      if (lastNodeType === 'tablerow') {
        tableRowIndex = lastNodeOption.children[0].children.length;
      }
      const tdOptions = lineText
        .slice(1, lineText.length - 1)
        .split('|')
        .map((text: string, index: number) => {
          const span: any = {
            'data-row-index': tableRowIndex,
            'data-col-index': index,
            rowspan: 1,
            colspan: 1,
          };
          text = text
            // |(-2)|: column span
            .replace(/(.*)(?<! )\(-(\d+)\)(.*)/, (match, $1, $2, $3) => {
              span.colspan = parseInt($2);
              return `${$1}${$3}`;
            })
            // |(=2)|: row span
            .replace(/(.*)(?<! )\(=(\d+)\)(.*)/, (match, $1, $2, $3) => {
              span.rowspan = parseInt($2);
              return `${$1}${$3}`;
            });
          span['data-row-span'] = span.rowspan;
          span['data-col-span'] = span.colspan;
          return {
            tag: 'td',
            html: transformInlineElement(text.trim()),
            attributes: {
              'data-md': '',
              'data-md-table-data-cell': 'td',
              ...span,
            },
          };
        });
      
      tdOptions.reduce((prev: any, curr: any) => {
        curr.attributes['data-col-index'] = prev;
        return prev + curr.attributes['data-col-span'];
      }, 0);
      
      if (lastNodeOption && lastNodeOption.tableRowShadow) {
        lastNodeOption.tableRowShadow = lastNodeOption.tableRowShadow
          .filter((shadow: any) => tableRowIndex < (shadow.rowIndex + shadow.rowSpan));
        lastNodeOption.tableRowShadow.forEach((shadow: any) => {
          tdOptions.filter((td: any) => td.attributes['data-col-index'] >= shadow.colIndex)
            .forEach((td: any) => td.attributes['data-col-index'] += shadow.colSpan);
        });
      }

      if (lastNodeType !== 'tablerow') { // create table
        const tableRowShadow = tdOptions
          .filter((td: any) => td.attributes['data-row-span'] > 1)
          .map(({ attributes: {
            ['data-row-index']: rowIndex,
            ['data-col-index']: colIndex,
            ['data-row-span']: rowSpan,
            ['data-col-span']: colSpan,
          } }: any) => ({ rowIndex, colIndex, rowSpan, colSpan }));
        const tableHeadRow = Math.max(tableRowShadow.reduce((prev: any, curr: any) => Math.max(prev, curr.rowSpan), 0), 1);
        options.push({
          tag: 'table',
          attributes: {
            classes: `table-index-${lineIndex}`,
            'data-md': '',
            'data-md-table-index': lineIndex,
          },
          children: [
            {
              tag: 'tbody',
              children: [{ tag: 'tr', children: tdOptions }],
            },
            {
              tag: 'style',
              text: `.table-index-${lineIndex} tr:nth-child(-n+${tableHeadRow}) td { font-weight: 500; background-color: #dedede; }`
            },
          ],
          tableRowShadow,
        });
        return { options, lastNodeType: 'tablerow' };
      } else {
        if (/^[\|:\-]+$/.test(lineText)) { // table text align
          const styleText = lineText
            .slice(1, lineText.length - 1)
            .split('|')
            .map((alignText: string, index: number) => {
              if (/^:\-+:$/.test(alignText)) {
                // return `.${lastNodeOption.attributes.classes} td[data-col-index="${index}"] { text-align: center; }`;
                return `[data-md-table-index='${
                  lastNodeOption.attributes['data-md-table-index']
                }'] td[data-col-index='${
                  index
                }'] { text-align: center; }`;
              }
              if (/^\-+:$/.test(alignText)) {
                // return `.${lastNodeOption.attributes.classes} td[data-col-index="${index}"] { text-align: right; }`;
                return `[data-md-table-index='${
                  lastNodeOption.attributes['data-md-table-index']
                }'] td[data-col-index='${
                  index
                }'] { text-align: right; }`;
              }
              return '';
            })
            .join(' ');
          lastNodeOption.children.push({ tag: 'style', text: styleText });
          return { options, lastNodeType: 'tablerow' };
        } else { // push new table row
          lastNodeOption.tableRowShadow.push(...tdOptions
            .filter((td: any) => td.attributes['data-row-span'] > 1)
            .map(({ attributes: {
              ['data-row-index']: rowIndex,
              ['data-col-index']: colIndex,
              ['data-row-span']: rowSpan,
              ['data-col-span']: colSpan,
            } }: any) => ({ rowIndex, colIndex, rowSpan, colSpan })));

          lastNodeOption.children[0].children.push({ tag: 'tr', children: tdOptions });
          return { options, lastNodeType: 'tablerow' };
        }
      }
    }

    /**
     * horizontal-rule
     */
    if (match = lineText.match(/^[\*\-_]{3,}$/)) {
      options.push({
        tag: 'hr',
        attributes: {
          'data-md': '',
          'data-md-horizontal-rule': 'horizontal-rule',
        },
      });
      return { options, lastNodeType: 'horizontal-rule' };
    }

    /**
     * unordered-list-item
     */
    if (match = lineText.match(/^(\s*)\- (.*)$/)) {
      options.push({
        tag: 'li',
        html: transformInlineElement(match[2].trim()),
        attributes: {
          style: `--indent: ${match[1].length * 16}px`,
          'data-md': '',
          'data-md-unordered-list-item': 'list-item',
        }
      });
      return { options, lastNodeType: 'list-item' };
    }

    /**
     * ordered-list-item
     */
     if (match = lineText.match(/^(\s*)([1-9]\d*)\. (.*)$/)) {
      const [m_whole, m_space, m_start_serial_number, m_text] = match;
      options.push({
        tag: 'ol',
        attributes: {
          style: `--indent: ${m_space.length * indent}px`,
          start: m_start_serial_number,
          'data-md': '',
          'data-md-ordered-list': 'ordered-list',
        },
        children: [
          {
            tag: 'li',
            html: transformInlineElement(m_text.trim()),
            attributes: {
              'data-md': '',
              'data-md-ordered-list-item': 'ordered-list-item',
            },
          },
        ],
      });
      return { options, lastNodeType: 'ordered-list' };
    }

    /**
     * paragraph
     */
    if (match = lineText.match(/^(\s*)([^<>\n]+)$/)) {
      options.push({
        tag: 'p',
        // text: match[2].trim(),
        html: transformInlineElement(match[2].trim()),
        attributes: {
          style: `--indent: ${match[1].length * 16}px`,
          'data-md': '',
          'data-md-paragraph': 'paragraph',
        },
      });
      return { options, lastNodeType: 'paragraph' };
    }

    /**
     * !\n
     */
    if (lineText !== '\n') {
      options.push({
        tag: 'p',
        // text: lineText,
        html: transformInlineElement(lineText.trim()),
      });
      return { options, lastNodeType: 'paragraph' };
    }

    /**
     * \n
     */
    return { options, lastNodeType };
  }, {
    options: [
      BasicMarkdownStyle,
    ],
    lastNodeType: '',
    status: {},
  }).options;

  if (output === 'options') return htmlNodeOptions;

  return htmlNodeOptions.map(createElement);
};
