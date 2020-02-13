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
    }
  ]
};
