const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (root) {
    root.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
            secure: false,
            headers: {
                'Acsess-Control-Allow-Origin': 'http://localhost:5173/'
            }
        })
    )
}