const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function setEntry () {
    const files = glob.sync('./src/pages/**/index.js');
    const entry = {};
    files.forEach(file => {
        const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.js$/);
        if (ret) {
            const name = `pages/${ret[1]}/index`;
            entry[name] = file;
        }
    });
    return entry;
}

function getTemplate (name) {
    const files = glob.sync(`./src/pages/${name}/index.html`);
    if (files.length > 0) {
        return files[0];
    }
    return './public/index.html';
}

function setHtmlPlugin () {
    const files = glob.sync('./src/pages/**/index.js');
    const options = [];
    files.forEach(file => {
        const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.js$/);
        if (ret) {
            const name = ret[1];
            options.push(new HtmlWebpackPlugin({
                filename:`pages/${name}/index.html`,
                template:getTemplate(name),
                chunks:['dll','vendors','common',`pages/${name}/index`],
                hash:true
            }));
        }
    });
    return options;
}


module.exports = {
    setEntry,
    setHtmlPlugin
};

