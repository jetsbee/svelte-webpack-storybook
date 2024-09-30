const path = require('node:path');
const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

const common = (mode) => {
  const prod = mode === 'production';

  return merge([
    {
      entry: {
        'build/bundle': ['./src/main.ts'],
      },
      output: {
        path: path.join(process.cwd(), 'public'),
        filename: '[name].js',
        chunkFilename: prod ? 'build/[id].[contenthash].js' : 'build/[id].js',
      },
    },
    /**
     * MARK: - Add string to disable warning with svelte-loader
     * (Bug related with resolve.conditionNames check logic)
     *
     * conditionNames:[svelte]
     */
    parts.svelte(mode),
    parts.typescriptOrJavascript(),
    parts.css(mode),
    parts.typeCheck(),
    parts.webpackBar(),
  ]);
};

const development = merge([parts.devServer()]);

const production = ({ analysis }) => merge([analysis && parts.analysis(), parts.cleanBuild()].filter(Boolean));

module.exports = (env, argv) => {
  const { mode } = argv;

  switch (mode) {
    case 'production':
      return merge(common(mode), production(env), { mode });
    case 'development':
      return merge(common(mode), development, { mode });
    default:
      throw new Error(`Unknown mode, ${mode}`);
  }
};
