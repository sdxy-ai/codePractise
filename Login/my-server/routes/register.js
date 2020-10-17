const router = require('koa-router')();
const registerHandle = require('../routesHandle/register');

router.post('/api/register', registerHandle);

module.exports = router