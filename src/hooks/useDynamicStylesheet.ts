import { useEffect } from 'react';

export const useDynamicStylesheet = (styleSheet: string): void => {
  useEffect(() => {
    const styleElement = document.createElement('style');

    styleElement.innerHTML = styleSheet;

    document.head.append(styleElement);

    return () => styleElement.remove();
  }, [styleSheet]);
};

export default useDynamicStylesheet;
