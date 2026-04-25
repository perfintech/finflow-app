module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@constants': './src/constants',
            '@components': './src/components',
            '@screens': './src/screens',
            '@database': './src/database',
            '@utils': './src/utils',
            '@context': './src/context',
            '@navigation': './src/navigation',
            '@assets': './assets',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
