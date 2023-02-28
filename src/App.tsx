import { useEffect, useState } from 'react';
import './App.css';
import { marked } from 'marked';
import hljs from 'highlight.js';

import 'highlight.js/styles/hybrid.css';
window.hljs = hljs;

//@ts-ignore
import * as HighlightNumber from './highlight-line-number.js';

if (window.hljs) {
  window.hljs.initLineNumbersOnLoad = HighlightNumber.initLineNumbersOnLoad;
  window.hljs.lineNumbersBlock = HighlightNumber.lineNumbersBlock;
  window.hljs.lineNumbersValue = HighlightNumber.lineNumbersValue;

  HighlightNumber.addStyles();
} else {
  console.error('highlight.js not detected!');
}

function App() {
  const [markDown, setMarkDown] = useState('');

  useEffect(() => {
    hljs.highlightAll();
    hljs.initHighlightingOnLoad();

    document.querySelectorAll('code.hljs').forEach(function (block, i) {
      (hljs as any).lineNumbersBlock(block);
    });
  });

  return (
    <div className="App">
      <div className="h-screen grid grid-cols-2 gap-0">
        <div className="p-5 bg-gray-900">
          <textarea
            name="input-box"
            className="w-full h-full"
            onChange={(e) => {
              setMarkDown(e.target.value);
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div className="p-5 flex flex-col w-full h-full overflow-auto">
            <div
              className="prose lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: marked(markDown) }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
