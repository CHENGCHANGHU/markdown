import { createElement } from '@golden-tiger/dom';

function transformInlineElement(lineText) {
  return lineText
    .replace(/<(?!(\/?(p|pre|code|div|strong|em|table|thead|tbody|th|tr|td)))/g, '&lt;')
    .replace(/(?<!(p|pre|code|div|strong|em|table|thead|tbody|th|tr|td))>/g, '&gt;')
    .replace(/^(.*)\*\*(.+)\*\*(.*)$/g, (match, $1, $2, $3) => `${$1}<strong>${$2}</strong>${$3}`)
    .replace(/^(.*)\*(.+)\*(.*)$/g, (match, $1, $2, $3) => `${$1}<i>${$2}</i>${$3}`)
    .replace(/(?<!\\)`([^`]+)(?<!\\)`/g, (match, m_inline_code) => `<code>${m_inline_code}</code>`)
    .replace(/^([^\[]*)\[(.*)\]\((.*)\)(.*)$/g, (match, $1, $2, $3, $4) => `${$1}<a href="${$3}" target="_blank">${$2}</a>${$4}`);
}

const basicStyle = {
  tag: 'style',
  text: `
    [data-markdown-heading='h1'] {
      padding: 32px 0 16px 0;
    }

    [data-markdown-heading='h2'] {
      padding: 16px 0 8px 0;
    }

    [data-markdown-heading='h2'] {
      padding: 8px 0 8px 0;
    }
    
    p {
      margin: 8px 0 8px 0;
    }

    [data-markdown-block-quotes='block-quotes'] {
      margin-left: var(--indent);
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 4px 16px;
      border-left: 8px solid #ccc;
      background-color: #efefef;
    }
    
    table, th,
    [data-markdown-td='td'] {
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

    code {
      display: inline-block;
      border: 1px solid #d1d1d1;
      padding: 0 2px;
      border-radius: 4px;
      background-color: #e1e1e1;
    }        
  `,
};

export function transformer(mdText, option = {
  indent: 16,
}) {
  // console.log(mdText);
  let lastLineType = '';
  let lastElementOption = '';
  const elementOptions = [];

  const markdownLines = [];
  let row = 0;
  let pos = 0;
  let lineText = '';
  let skipNextFlag = false;

  mdText.replace(/\\r\\n/g, '\n');

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

  const htmlNodeOptions = markdownLines.reduce(({options, lastNodeType, status}, lineText, lineIndex) => {
    let match = null;

    /**
     * code-block-start
     */
    if (match = lineText.match(/^(\s*)```([^`]*)$/)) {
      if (lastNodeType !== 'code-block-start') {
        options.push({
          tag: 'div',
          attributes: {
            classes: `code-block-index-${lineIndex}`,
            style: `--indent: ${match[1].length * 16}px`,
            ['data-code-type']: match[2],
            ['data-code-block-index']: lineIndex,
          },
          children: [
            {
              tag: 'pre',
              text: '',
              attributes: {
                classes: `code-block-index-${lineIndex}-line-box`,
              }
            },
            {
              tag: 'pre',
              text: '',
              attributes: {
                classes: `code-block-index-${lineIndex}-code-box`,
              }
            }
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
        const lastNodeOption = options.at(-1);
        const codeBlockIndex = lastNodeOption.attributes['data-code-block-index'];
        lastNodeOption.children.push({
          tag: 'style',
          text: `
            .code-block-index-${codeBlockIndex} {
              display: flex;
              flex-flow: row nowrap;
              column-gap: 4px;
              padding: 8px 16px;
              border-radius: 4px;
              background-color: #aaa;
              box-sizing: border-box;
              max-height: 400px;
              overflow-y: auto;
            }
            .code-block-index-${codeBlockIndex}-line-box,
            .code-block-index-${codeBlockIndex}-code-box {
              color: #ccc;
              font-family: monospace;
              white-space: pre;
              line-height: 14px;
              padding: 4px 0;
              line-height: 1.2;
            }
            .code-block-index-${codeBlockIndex}-line-box {
              color: #343434;
              text-align: right;
            }
            .code-block-index-${codeBlockIndex}-code-box {
              flex: 1;
              height: 100%;
              padding-left: 4px;
              border-radius: 4px;
              background-color: #222;
            }
          `,
        });
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
      const { attributes: { ['data-code-block-index']: codeIndex }, children: [lineBox, codeBox] } = options.at(-1);
      if (lineText !== '\n') {
        lineBox.text += `${(lineIndex - codeIndex - 2) / 2}:\n`;
      }
      codeBox.text += lineText;
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
          ['data-markdown-split-line']: 'split-line',
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
      options.push({
        tag: `h${match[1].length}`,
        html: transformInlineElement(match[2].trim()),
        attributes: {
          'data-markdown-heading': `h${match[1].length}`,
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
            'data-indent': match[1].length,
            'data-markdown-block-quotes': 'block-quotes',
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
        .map((text, index) => {
          const span = {
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
              'data-markdown-td': 'td',
              ...span,
            },
          };
        });
      
      tdOptions.reduce((prev, curr) => {
        curr.attributes['data-col-index'] = prev;
        return prev + curr.attributes['data-col-span'];
      }, 0);
      
      if (lastNodeOption && lastNodeOption.tableRowShadow) {
        lastNodeOption.tableRowShadow = lastNodeOption.tableRowShadow
          .filter(shadow => tableRowIndex < (shadow.rowIndex + shadow.rowSpan));
        lastNodeOption.tableRowShadow.forEach(shadow => {
          tdOptions.filter(td => td.attributes['data-col-index'] >= shadow.colIndex)
            .forEach(td => td.attributes['data-col-index'] += shadow.colSpan);
        });
      }

      if (lastNodeType !== 'tablerow') { // create table
        const tableRowShadow = tdOptions
          .filter(td => td.attributes['data-row-span'] > 1)
          .map(({ attributes: {
            ['data-row-index']: rowIndex,
            ['data-col-index']: colIndex,
            ['data-row-span']: rowSpan,
            ['data-col-span']: colSpan,
          } }) => ({ rowIndex, colIndex, rowSpan, colSpan }));
        const tableHeadRow = Math.max(tableRowShadow.reduce((prev, curr) => Math.max(prev, curr.rowSpan), 0), 1);
        options.push({
          tag: 'table',
          attributes: {
            classes: `table-index-${lineIndex}`,
            'data-markdown-table-index': lineIndex,
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
            .map((alignText, index) => {
              if (/^:\-+:$/.test(alignText)) {
                // return `.${lastNodeOption.attributes.classes} td[data-col-index="${index}"] { text-align: center; }`;
                return `[data-markdown-table-index='${
                  lastNodeOption.attributes['data-markdown-table-index']
                }'] td[data-col-index='${
                  index
                }'] { text-align: center; }`;
              }
              if (/^\-+:$/.test(alignText)) {
                // return `.${lastNodeOption.attributes.classes} td[data-col-index="${index}"] { text-align: right; }`;
                return `[data-markdown-table-index='${
                  lastNodeOption.attributes['data-markdown-table-index']
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
            .filter(td => td.attributes['data-row-span'] > 1)
            .map(({ attributes: {
              ['data-row-index']: rowIndex,
              ['data-col-index']: colIndex,
              ['data-row-span']: rowSpan,
              ['data-col-span']: colSpan,
            } }) => ({ rowIndex, colIndex, rowSpan, colSpan })));

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
      });
      return { options, lastNodeType: 'horizontal-rule' };
    }

    /**
     * list-item
     */
    if (match = lineText.match(/^(\s*)\- (.*)$/)) {
      options.push({
        tag: 'li',
        html: transformInlineElement(match[2].trim()),
        attributes: {
          style: `--indent: ${match[1].length * 16}px`,
        }
      });
      return { options, lastNodeType: 'list-item' };
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
        }
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
  }, { options: [
    basicStyle,
  ], lastNodeType: '', status: {}}).options;

  console.log(htmlNodeOptions);

  return htmlNodeOptions.map(createElement);
};
