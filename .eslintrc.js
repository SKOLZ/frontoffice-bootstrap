module.exports = {
  extends: ['wolox-react'],
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '~components': './src/app/components',
          '~screens': './src/app/screens',
          '~config': './src/config',
          '~constants': './src/constants',
          '~redux': './src/redux',
          '~services': './src/services',
          '~assets': './src/app/assets',
          '~utils': './src/utils',
          '~serializer': './src/serializer'
        }
      }
    }
   },
   rules: {
    'react/prop-types': ['off'],
    'react/jsx-no-bind': ['off'],
    'camelcase': ['off'],
    'react/no-multi-comp': ['off']
   }
};
