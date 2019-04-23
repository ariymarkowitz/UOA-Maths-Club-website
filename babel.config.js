module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', { targets: 'last 2 Firefox versions' }],
    ['@babel/preset-react', { development: api.env('development') }]
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    'styled-jsx/babel'
  ];
  return { presets, plugins };
};
