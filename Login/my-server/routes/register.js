const router = require('koa-router')();
const db = require('../db/index');
const md5 = require('md5');

const registerHandle = async (ctx, next) => {
  const { nickname, email, password } = ctx.request.body;
  console.log({ nickname, email, password });
  // 目前的这个地方是ES6的简写，当属性名与变量名一致时可以这样写
  // connection(sql, { username, email, password });
  // 现在不一致了,就需要把对象的属性名和对象的属性值写全
  try {
    md5(password);
    const sql1 = `select count(*) as num from user where username="${nickname}"`;
    let result1 = await db.query(sql1)
    if (result1[0].num) {
      let result1 = { code: 0, msg: '用户名已存在' };
      ctx.body = result1;
    }
    console.log(result1);
    const sql2 = `select count(*) as num from user where email="${email}"`;

    let result2 = await db.query(sql2)

    if (result2[0].num) {
      let result2 = { code: 0, msg: 'Email已存在' };
      ctx.body = result2;
    } else {
      const sql = `insert  INTO  user(username,email,password)  values ('${nickname}','${email}','${password}')`;
      let result = await db.query(sql)

      if (result.affectedRows) {
        let result = { code: 1, msg: '注册成功' };
        ctx.body = result;
      } else {
        let result = { code: 0, msg: '注册失败' };
        ctx.body = result;
      }
    }
  } catch (error) {
    console.log('[SELECT ERROR] - ', error.message)
    ctx.throw(500, '后台报错')
  }

}

router.post('/api/register', registerHandle);

module.exports = router