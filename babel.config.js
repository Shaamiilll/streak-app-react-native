// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'nativewind/babel',   // ← move it here (as a string in presets array)
    ],
    // plugins: []   ← keep empty or add others if needed, but NOT nativewind here
  };
};