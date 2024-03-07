const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
    runtimeCompiler: true,
    publicPath: './',
    css: {
        extract: IS_PROD,
        requireModuleExtension: true,
        // 去掉文件名中的 .module
        loaderOptions: {
            stylus: {
                // import: ['~@/style/variable.styl', '~@/style/vendor.styl']
                import: ['~@/style/variable.styl']
            }
        }
    }
}
