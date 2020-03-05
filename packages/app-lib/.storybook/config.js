import { addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

const req = require.context('../src', true, /\.story\.(ts|tsx)$/);

addParameters({
  options: {
    showNav: true,
    isToolshown: true,
    showPanel: true,
    panelPosition: 'right'
  },
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);