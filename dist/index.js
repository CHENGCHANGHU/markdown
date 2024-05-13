!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Tree=e():t.Tree=e()}("undefined"==typeof self?this:self,(()=>(()=>{var t={503:function(t,e,n){var a,o,r,d;function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function c(t,e,n){return(e=function(t){var e=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,"string");if("object"!==s(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===s(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}t=n.nmd(t),"undefined"==typeof self||self,d=function(){return function(){"use strict";var t={d:function(e,n){for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},o:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r:function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t){var e,a;if(t){if(t instanceof HTMLElement)return t;if(Array.isArray(t))return t.map((function(t){return n(t)}));var o=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({lifecycle:{}},t),r=o.tag,d=o.text,s=o.html,p=o.children,u=o.attributes,b=o.events,m=(o.lifecycle||{}).created;if(!r)return document.createElement("template");var f=null;return f=["svg","path"].includes(r)?document.createElementNS("http://www.w3.org/2000/svg",r):document.createElement(r),s&&(f.innerHTML=s),(d||0===d||""===d)&&(f.innerText=d),u&&Object.keys(u).forEach((function(t){"classes"===t&&Array.isArray(u[t])?f.className=u[t].join(" "):f.setAttribute("classes"===t?"class":t,u[t])})),b&&Object.keys(b).forEach((function(e){f.addEventListener(e,b[e].bind(t))})),p&&(e=f).append.apply(e,function(t){if(Array.isArray(t))return i(t)}(a=p.filter(Boolean).map(n))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(a)||function(t,e){if(t){if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),m&&"function"==typeof m&&m(f,t),f}}t.r(e),t.d(e,{createElement:function(){return n},query:function(){return a}});var a=function(){var t=new Map;return function(e){if(!t.has(e)){var n=document.querySelector(e);if(!n)return null;t.set(e,n)}return t.get(e)}}();return e}()},"object"==s(e)&&"object"==s(t)?t.exports=d():(o=[],void 0===(r="function"==typeof(a=d)?a.apply(e,o):a)||(t.exports=r))}},e={};function n(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={id:a,loaded:!1,exports:{}};return t[a].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.d=(t,e)=>{for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var a={};return(()=>{"use strict";n.r(a),n.d(a,{transform:()=>l,transformInlineElement:()=>d});var t=n(503);const e={tag:"style",text:"\n    [data-md] {\n      line-height: 1.5;\n    }\n\n    [data-md-heading='h1'] {\n      padding: 32px 0 16px 0;\n    }\n\n    [data-md-heading='h2'] {\n      padding: 24px 0 8px 0;\n    }\n\n    [data-md-heading='h3'] {\n      padding: 16px 0 0 0;\n    }\n\n    [data-md-block-quotes='block-quotes'] {\n      margin-left: var(--indent);\n      margin-top: 8px;\n      margin-bottom: 8px;\n      padding: 4px 8px;\n      border-left: 4px solid #ddd;\n      background-color: #eee;\n    }\n    \n    table, th,\n    [data-md-table-data-cell='td'] {\n      border: 1px solid #343434;\n    }\n    \n    table {\n      border-collapse: collapse;\n      border-spacing: 0px;\n      margin: 8px 0 8px 0;\n    }\n    \n    tr:nth-child(1) {\n      background-color: #dedede;\n      font-weight: 700;\n    }\n    \n    th, td {\n      padding: 4px 8px;\n    }\n    \n    a {\n      color: seagreen;\n    }\n\n    [data-md-inline-code='inline-code'] {\n      border: 1px solid #ccc;\n      padding: 0 2px;\n      border-radius: 4px;\n      background-color: #e3e3e3;\n    }\n    \n    [data-md-unordered-list-item='list-item'] {\n      margin: 8px 0;\n      margin-left: var(--indent);\n    }\n\n    [data-md-code-block='code-block'] {\n      display: flex;\n      flex-flow: row nowrap;\n      column-gap: 4px;\n      margin: 8px 0;\n      padding: 8px 16px;\n      border-radius: 4px;\n      background-color: #eee;\n      box-sizing: border-box;\n      max-height: 400px;\n      overflow-y: auto;\n    }\n\n    [data-md-code-block-line-box='code-block-line-box'],\n    [data-md-code-block-code-box='code-block-code-box'] {\n      padding: 4px 0;\n      height: 100%;\n      color: #ccc;\n      font-family: monospace;\n      white-space: pre;\n    }\n\n    [data-md-code-block-line-box='code-block-line-box'] {\n      color: #343434;\n      text-align: right;\n    }\n\n    [data-md-code-block-code-box='code-block-code-box'] {\n      flex: 1;\n      padding-left: 4px;\n      border-radius: 4px;\n      background-color: #222;\n    }\n\n    [data-md-figure='figure'] {\n      display: flex;\n      flex-flow: column nowrap;\n      align-items: center;\n      row-gap: 8px;\n    }\n\n    [data-md-image='image'] {\n      width: 80%;\n      max-height: 600px;\n      object-fit: scale-down;\n    }\n\n    [data-md-figcaption=\"figcaption\"] {\n      color: #666;\n    }\n\n    [data-md-ordered-list='ordered-list'] {\n      margin: 8px 0;\n      margin-left: var(--indent);\n    }\n\n    [data-md-ordered-list-item='ordered-list-item'] {\n      list-style-position: inside;\n    }\n\n    [data-md-paragraph='paragraph'] {\n      margin: 8px 0;\n    }\n  "};function o(t){return t.replace(/</g,"&lt;").replace(/>/g,"&gt;")}function r(t){return t.replace(/<(?!(\/?(p|pre|code|div|strong|em|table|thead|tbody|th|tr|td)[^>]*?>))/g,"&lt;").replace(/(?<!(<\/?(p|pre|code|div|strong|em|table|thead|tbody|th|tr|td)[^>]*?))>/g,"&gt;").replace(/(?<!\\)\*(?<!\\)\*(.+?)(?<!\\)\*(?<!\\)\*/g,((t,e)=>`<strong data-md-strong='strong'>${e}</strong>`)).replace(/(?<!\\)\*(.+?)(?<!\\)\*/g,((t,e)=>`<i data-md-italic='italic'>${e}</i>`)).replace(/(?<!\\)!(?<!\\)\[(.+?)(?<!\\)\](?<!\\)\((.+?)(?<!\\)\)/g,((t,e,n)=>`<figure data-md-figure="figure">\n        <img src="${n}" alt="${e}" data-md-image="image">\n        <figcaption data-md-figcaption="figcaption">${e}</figcaption>\n      </figure>`)).replace(/(?<!\\)\[(.+?)(?<!\\)\](?<!\\)\((.+?)(?<!\\)\)/g,((t,e,n)=>`<a href="${n}" target="_blank" data-md-link='link'>${e}</a>`))}function d(t){const e=t.split("`"),{length:n}=e;return r(n<3?t:1==(1&n)?e.reduce(((t,e,n)=>t+(0==(1&n)?r(e):`<code data-md-inline-code='inline-code'>${o(e)}</code>`)),""):e.slice(0,-2).reduce(((t,e,n)=>t+(0==(1&n)?r(e):`<code data-md-inline-code='inline-code'>${e}</code>`)),"")+r(e[n-2])+"`"+r(e[n-1]))}const i={indent:16,output:"dom"};function l(n,a){const{output:r,indent:l}={...i,...a},c=function(t){let e=t.replaceAll(/\r\n/g,"\n").replaceAll(/\r/g,"\n").split(/\n/).reduce(((t,e)=>(t.push(e,"\n"),t)),[]);return e.pop(),e}(n),s=c.reduce((({options:t,lastNodeType:e,status:n},a,r)=>{let i=null;if(i=a.match(/^(\s*)```([^`]*)$/)){const[n,a,o]=i;if("code-block-start"!==e)return t.push({tag:"div",attributes:{classes:`code-block-index-${r}`,style:`--indent: ${16*a.length}px`,"data-md":"","data-md-code-block":"code-block","data-md-code-block-type":o,"data-md-code-block-index":r},children:[{tag:"pre",text:"",attributes:{classes:`code-block-index-${r}-line-box`,"data-md":"","data-md-code-block-line-box":"code-block-line-box"}},{tag:"pre",text:"",attributes:{classes:`code-block-index-${r}-code-box`,"data-md":"","data-md-code-block-code-box":"code-block-code-box"}}]}),{options:t,lastNodeType:"code-block-start",status:{skipNextLine:!0}}}if((i=a.match(/^(\s*)```(\s*)$/))&&"code-block-start"===e)return{options:t,lastNodeType:"code-block-end"};if("code-block-start"===e){if(n&&n.skipNextLine)return{options:t,lastNodeType:"code-block-start"};const{attributes:{"data-md-code-block-index":e},children:[d,i]}=t.at(-1);return"\n"!==a&&(d.text+=(r-e-2)/2+":\n"),i.text+=o(a),{options:t,lastNodeType:"code-block-start"}}if(""===a)return t.push({tag:"div",text:"",attributes:{"data-md-split-line":"split-line"}}),{options:t,lastNodeType:"split"};if(i=a.match(/^(#+) (.+?)$/)){const[e,n,a]=i;return t.push({tag:`h${i[1].length}`,html:d(a.trim()),attributes:{"data-md":"","data-md-heading":`h${n.length}`}}),{options:t,lastNodeType:"heading"}}if(i=a.match(/^(\s*)(>+) (.+?)$/)){const n=t[t.length-1];return"quote"===e&&i[1].length===n.attributes["data-indent"]?n.html+="<br>"+d(i[3].trim()):t.push({tag:"p",html:d(i[3].trim()),attributes:{style:`--indent: ${16*i[1].length}px`,"data-md":"","data-indent":i[1].length,"data-md-block-quotes":"block-quotes"}}),{options:t,lastNodeType:"quote"}}if(i=a.match("tablerow"===e?/^(\|[^\|]*)+\|$/:/^(\|[^\|]+)+\|$/)){const n=t[t.length-1];let o=0;"tablerow"===e&&(o=n.children[0].children.length);const i=a.slice(1,a.length-1).split("|").map(((t,e)=>{const n={"data-row-index":o,"data-col-index":e,rowspan:1,colspan:1};return t=t.replace(/(.*)(?<! )\(-(\d+)\)(.*)/,((t,e,a,o)=>(n.colspan=parseInt(a),`${e}${o}`))).replace(/(.*)(?<! )\(=(\d+)\)(.*)/,((t,e,a,o)=>(n.rowspan=parseInt(a),`${e}${o}`))),n["data-row-span"]=n.rowspan,n["data-col-span"]=n.colspan,{tag:"td",html:d(t.trim()),attributes:{"data-md":"","data-md-table-data-cell":"td",...n}}}));if(i.reduce(((t,e)=>(e.attributes["data-col-index"]=t,t+e.attributes["data-col-span"])),0),n&&n.tableRowShadow&&(n.tableRowShadow=n.tableRowShadow.filter((t=>o<t.rowIndex+t.rowSpan)),n.tableRowShadow.forEach((t=>{i.filter((e=>e.attributes["data-col-index"]>=t.colIndex)).forEach((e=>e.attributes["data-col-index"]+=t.colSpan))}))),"tablerow"!==e){const e=i.filter((t=>t.attributes["data-row-span"]>1)).map((({attributes:{"data-row-index":t,"data-col-index":e,"data-row-span":n,"data-col-span":a}})=>({rowIndex:t,colIndex:e,rowSpan:n,colSpan:a}))),n=Math.max(e.reduce(((t,e)=>Math.max(t,e.rowSpan)),0),1);return t.push({tag:"table",attributes:{classes:`table-index-${r}`,"data-md":"","data-md-table-index":r},children:[{tag:"tbody",children:[{tag:"tr",children:i}]},{tag:"style",text:`.table-index-${r} tr:nth-child(-n+${n}) td { font-weight: 500; background-color: #dedede; }`}],tableRowShadow:e}),{options:t,lastNodeType:"tablerow"}}if(/^[\|:\-]+$/.test(a)){const e=a.slice(1,a.length-1).split("|").map(((t,e)=>/^:\-+:$/.test(t)?`[data-md-table-index='${n.attributes["data-md-table-index"]}'] td[data-col-index='${e}'] { text-align: center; }`:/^\-+:$/.test(t)?`[data-md-table-index='${n.attributes["data-md-table-index"]}'] td[data-col-index='${e}'] { text-align: right; }`:"")).join(" ");return n.children.push({tag:"style",text:e}),{options:t,lastNodeType:"tablerow"}}return n.tableRowShadow.push(...i.filter((t=>t.attributes["data-row-span"]>1)).map((({attributes:{"data-row-index":t,"data-col-index":e,"data-row-span":n,"data-col-span":a}})=>({rowIndex:t,colIndex:e,rowSpan:n,colSpan:a})))),n.children[0].children.push({tag:"tr",children:i}),{options:t,lastNodeType:"tablerow"}}if(i=a.match(/^[\*\-_]{3,}$/))return t.push({tag:"hr",attributes:{"data-md":"","data-md-horizontal-rule":"horizontal-rule"}}),{options:t,lastNodeType:"horizontal-rule"};if(i=a.match(/^(\s*)\- (.*)$/))return t.push({tag:"li",html:d(i[2].trim()),attributes:{style:`--indent: ${16*i[1].length}px`,"data-md":"","data-md-unordered-list-item":"list-item"}}),{options:t,lastNodeType:"list-item"};if(i=a.match(/^(\s*)([1-9]\d*)\. (.*)$/)){const[e,n,a,o]=i;return t.push({tag:"ol",attributes:{style:`--indent: ${n.length*l}px`,start:a,"data-md":"","data-md-ordered-list":"ordered-list"},children:[{tag:"li",html:d(o.trim()),attributes:{"data-md":"","data-md-ordered-list-item":"ordered-list-item"}}]}),{options:t,lastNodeType:"ordered-list"}}return(i=a.match(/^(\s*)([^<>\n]+)$/))?(t.push({tag:"p",html:d(i[2].trim()),attributes:{style:`--indent: ${16*i[1].length}px`,"data-md":"","data-md-paragraph":"paragraph"}}),{options:t,lastNodeType:"paragraph"}):"\n"!==a?(t.push({tag:"p",html:d(a.trim())}),{options:t,lastNodeType:"paragraph"}):{options:t,lastNodeType:e}}),{options:[e],lastNodeType:"",status:{}}).options;return"options"===r?s:s.map(t.createElement)}})(),a})()));