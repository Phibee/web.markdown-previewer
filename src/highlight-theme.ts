import React from 'react';

//@ts-ignore
import hybrid from 'highlight.js/styles/hybrid.css?inline';
import tomorrowNightBright from 'highlight.js/styles/vs2015.css?inline';

export const hightlightJSThemeList = {
  hybrid: {
    label: 'Hybrid',
    theme: hybrid,
  },
  tomorrowNightBright: {
    label: 'Hybrid',
    theme: tomorrowNightBright,
  },
};

type HLJsType = typeof hightlightJSThemeList;
type HLJsTypeKey = keyof HLJsType;

export type IHighlightTheme = {
  [key in HLJsTypeKey]: string;
};

const highlightTheme: IHighlightTheme = {
  ['hybrid']: hightlightJSThemeList.hybrid.theme,
  ['tomorrowNightBright']: hightlightJSThemeList.tomorrowNightBright.theme,
};

export default highlightTheme;
