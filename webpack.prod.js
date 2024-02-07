const {merge} = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

// This FixMediaQueryPlugin is a workaround because of a bug in the cssMinimizerPlugin that calls transforms '@media screen' into '@mediascreen' which invalidates all the breakpoints in the css. 
class FixMediaQueryPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FixMediaQueryPlugin', (compilation, callback) => {
      // Loop through all compiled assets,
      // looking for .css files
      Object.keys(compilation.assets).forEach((filename) => {
        if (filename.endsWith('.css')) {
          // Get the asset's source
          const assetSource = compilation.assets[filename].source();
          // Change @mediascreen to @media screen
          const updatedSource = assetSource.replace(/@mediascreen/g, '@media screen');
          // Update the asset's source in the compilation
          compilation.assets[filename] = {
            source: () => updatedSource,
            size: () => updatedSource.length,
          };
        }
      });
      callback();
    });
  }
}

module.exports = merge(common, {
  mode: "production",

  plugins: [
    new FixMediaQueryPlugin(), // Remove once bug in cssMinimizerPlugin has been fixed.
  ],

  output: {
    filename: "[name].[fullhash:5].js",
    chunkFilename: "[id].[fullhash:5].css",
    path: path.resolve(__dirname, "dist")
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
        },
        exclude: /\/node_modules\//,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[fullhash:5].css",
        chunkFilename: "[id].[fullhash:5].css"
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default', {
              // Disable certain optimizations that may be too aggressive
              discardComments: { removeAll: true }, // Removes all comments
            },
          ],
        },
      }),
    ]
  }

});



