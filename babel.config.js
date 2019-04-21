module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env'],
    ['@babel/preset-react', { development: api.env('development') }]
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'smart' }]
  ];
  return { presets, plugins };
};
