require('dotenv').config();

const withTypescript = require('@zeit/next-typescript');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require('path');
const { ANALYZE } = process.env;
const Dotenv = require("dotenv-webpack");

module.exports = withTypescript({
    webpack: function (config, { isServer }) {

        if (ANALYZE) {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true
            }))
        }

        // setting .env
        config.plugins.push(
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true
            })
        );

        // setting typescript module resolution to works!
        config.resolve.alias = {
            "@idsck/assets": srcPath("src/assets"),
            "@idsck/components": srcPath("src/components"),
            "@idsck/containers": srcPath("src/containers"),
            "@idsck/factories": srcPath("src/factories"),
            "@idsck/helpers": srcPath("src/helpers"),
            "@idsck/hoc": srcPath("src/hoc"),
            "@idsck/global": srcPath("src"),
        }
        return config;
    }
});

// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
    return path.join(__dirname, "", subdir);
}
