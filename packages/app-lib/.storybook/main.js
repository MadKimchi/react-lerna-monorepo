const path = require('path');
module.exports = {
  stories: [
    '../src/**/*.story.[tj]sx'
    // '../doc/**/*.stories.[tj]s',
    // '../doc/**/*.story.[tj]sx'
  ],
  // addons: ['@storybook/addon-docs/register']
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json')
        }
      }
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    }
  ]
};
