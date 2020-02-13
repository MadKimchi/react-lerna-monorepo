import { addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

// const req = require.context('../docs', true, /\.stories\.(ts|tsx)$/);

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
    // getPropDefs
  }
});

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);

export const withCode = (source = null) => {
  return StoryComponent => {
    return props => {
      const channel = addons.getChannel();
      channel.emit('lucid-docs-source', source);

      return <StoryComponent {...props} />;
    };
  };
};

export const withProps = componentRef => {
  return StoryComponent => {
    return props => {
      const channel = addons.getChannel();
      channel.emit(
        'lucid-docs-display-props',
        JSON.stringify(getPropsData(componentRef))
      );
      return <StoryComponent {...props} />;
    };
  };
};

export const withChildComponents = (componentRef, maxHeight, path) => {
  return StoryComponent => {
    return props => {
      const channel = addons.getChannel();
      channel.emit(
        'lucid-docs-display-child-components',
        JSON.stringify(
          getChildComponentsData(componentRef, maxHeight, undefined, path)
        )
      );
      return <StoryComponent {...props} />;
    };
  };
};

export const exampleStory = ({ component, code, example, path }) => {
  const StoryComponent = getDefaultExport(example);
  const componentRef = getDefaultExport(component);

  const storyWithCode = withCode(code)(StoryComponent);
  const storyWithProps = withProps(componentRef)(storyWithCode);
  const storyWithChildComponents = withChildComponents(componentRef, 1, path)(
    storyWithProps
  );

  return storyWithChildComponents;
};
