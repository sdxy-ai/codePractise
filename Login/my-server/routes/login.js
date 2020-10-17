const router = require('koa-router')();
const loginHandle = require('../routesHandle/login');

router.post('/api/login', loginHandle);

module.exports = router