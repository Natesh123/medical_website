const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
  
  app.use(
    ['/api', '/uploads', '/admin/product/uploads'],
    createProxyMiddleware({
      target: apiURL,
      changeOrigin: true,
    })
  );
};
