module.exports = {
    productionSourceMap: false,
    publicPath: './',
    configureWebpack: config => {
        let plugins = [

        ]
        if (process.env.NODE_ENV !== 'development') {
            config.plugins = [...config.plugins, ...plugins]
        }
    }
}