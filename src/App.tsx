import { useEffect, useState, lazy } from 'react';
import './App.css';
import useDynamicStylesheet from './hooks/useDynamicStylesheet';

import { marked } from 'marked';
import hljs from 'highlight.js';

// import 'highlight.js/styles/hybrid.css';
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

// import hybridTheme from 'highlight.js/styles/hybrid.css?inline';
import cssTheme, { IHighlightTheme } from './highlight-theme';
import RadioButton from './components/RadioButton';

function App() {
  const [markDown, setMarkDown] = useState('');

  const [selectedTheme, setSelectedTheme] =
    useState<keyof IHighlightTheme>('hybrid');

  useDynamicStylesheet(cssTheme[selectedTheme].toString());

  useEffect(() => {
    hljs.highlightAll();
    hljs.initHighlightingOnLoad();

    document.querySelectorAll('code.hljs').forEach(function (block, i) {
      (hljs as any).lineNumbersBlock(block);
    });
  }, [markDown]);

  return (
    <div className="App h-screen">
      <div className="flex flex-col h-full">
        <div className="header bg-gray-900 border-b-[1px] border-gray-700">
          <div className="px-5 py-6">
            <RadioButton<keyof IHighlightTheme>
              name="theme-chooser"
              label="Hybrid"
              value="hybrid"
              labelCssStyle="text-white ml-2"
              checked={selectedTheme === 'hybrid'}
              handleChange={(e) =>
                setSelectedTheme(e.target.value as keyof IHighlightTheme)
              }
            />
            <RadioButton
              name="theme-chooser"
              label="Tomorrow Night Bright"
              value="tomorrowNightBright"
              labelCssStyle="text-white ml-2"
              checked={selectedTheme === 'tomorrowNightBright'}
              handleChange={(e) =>
                setSelectedTheme(e.target.value as keyof IHighlightTheme)
              }
            />
          </div>
        </div>
        <div className="container-body flex-grow bg-gray-900 grid grid-cols-2 gap-0 overflow-hidden">
          <div className="p-5 bg-gray-900">
            <textarea
              name="input-box"
              className="w-full h-full"
              onChange={(e) => {
                setMarkDown(e.target.value);
              }}
            />
          </div>
          <div className="overflow-hidden bg-white">
            <div className="p-5 flex flex-col w-full h-full overflow-auto">
              {selectedTheme && (
                <div
                  className="prose lg:prose-xl"
                  dangerouslySetInnerHTML={{ __html: marked(markDown) }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
