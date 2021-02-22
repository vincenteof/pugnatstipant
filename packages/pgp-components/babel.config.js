module.exports = function (api) {
  api.cache(false)
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: process.env.BABEL_ENV === 'esm' ? false : 'auto',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ]
  // We don't use any polyfill.
  // Instead we let the use to do it to avoid duplicating.
  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: process.env.BABEL_ENV === 'esm',
      },
    ],
  ]
  return {
    presets,
    plugins,
  }
}
