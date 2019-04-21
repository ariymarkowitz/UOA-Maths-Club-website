module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', { targets: { browsers: '> 1%, not ie 11' } }],
    ['@babel/preset-react', { development: api.env('development') }]
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }]
  ];
  return { presets, plugins };
};
