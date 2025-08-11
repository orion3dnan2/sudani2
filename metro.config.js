
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// تحسين الذاكرة المؤقتة
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// تسريع عملية البناء
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

// تقليل حجم Bundle
config.transformer.enableBabelRCLookup = false;

module.exports = config;
