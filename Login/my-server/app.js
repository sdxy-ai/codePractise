const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa-cors');
const register = require('./routes/register');
const login = require('./routes/login');
const onerror = require('koa-onerror')

onerror(app)
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser({
        enableTypes: ['json', 'form', 'text']
    })
);
app.use(json());

app.use(register.routes(), register.allowedMethods())
app.use(login.routes(), login.allowedMethods())

// app.listen(4000, () => {
//     console.log('Server running on http://localhost:4000');
// });

module.exports = app;