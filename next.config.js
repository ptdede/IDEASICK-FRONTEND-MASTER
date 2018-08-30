const withTypescript = require('@zeit/next-typescript')
const path = require('path');
// module.exports = withTypescript()

// This helper function is not strictly necessary.
// I just don't like repeating the path.join a dozen times.
function srcPath(subdir) {
    return path.join(__dirname, "", subdir);
}

module.exports = withTypescript({
    webpack: function (config, { isServer }) {

        // setting typescript module resolution to works!
        config.resolve.alias = {
            "@idsck/assets": srcPath("src/assets"),
            "@idsck/components": srcPath("src/components"),
            "@idsck/containers": srcPath("src/containers"),
            "@idsck/factories": srcPath("src/factories"),
            "@idsck/helpers": srcPath("src/helpers"),
            "@idsck/hoc": srcPath("src/hoc")
        }
        return config;
    }
})