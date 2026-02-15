// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// ✅ SVG support add karo
config.transformer.babelTransformerPath =
  require.resolve("react-native-svg-transformer");

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg",
);

config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

// ✅ NativeWind wrap karo
module.exports = withNativeWind(config, { input: "./global.css" });
