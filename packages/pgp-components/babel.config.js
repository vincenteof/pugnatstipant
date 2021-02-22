module.exports = function (api) {
  api.cache(true)
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 0.25%'],
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ]
  // We don't use any polyfill.
  // Instead we let the use to do it to avoid duplicating.
  const plugins = [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ]
  return {
    presets,
    plugins,
  }
}
