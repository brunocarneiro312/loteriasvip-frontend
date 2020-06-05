// vue.config.js
module.exports = {
    // proxy all webpack dev-server requests starting with /api
    // to our Spring Boot backend (localhost:8088) using http-proxy-middleware
    // see https://cli.vuejs.org/config/#devserver-proxy
    devServer: {
        proxy: {
            '/loteriasvip': {
                target: 'http://ec2-18-220-216-83.us-east-2.compute.amazonaws.com:8080/loteriasvip',
                ws: true,
                changeOrigin: true
            },
        }
    },
    // Change build paths to make them Maven compatible
    // see https://cli.vuejs.org/config/
    outputDir: 'target/dist',
    assetsDir: 'static'
}