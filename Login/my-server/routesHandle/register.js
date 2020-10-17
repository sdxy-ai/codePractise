//这个js文件中的内容是将注册的数据传到后端和数据库中，被Routes中的register.js调用


const db = require('../db/index');


module.exports = async (ctx, next) => {
  const { username, email, password } = ctx.request.body;
  // 目前的这个地方是ES6的简写，当属性名与变量名一致时可以这样写
  // connection(sql, { username, email, password });
  // 现在不一致了,就需要把对象的属性名和对象的属性值写全
  try {
    const sql1 = `select count(*) as num from user where username="${username.value}"`;

    let result1 = await db.query(sql1)

    if (result1[0].num) {
      let result1 = { code: 0, msg: '用户名已存在' };
      ctx.body = result1;
    }
    console.log(result1);
    const sql2 = `select count(*) as num from user where email="${email.value}"`;

    let result2 = await db.query(sql2)

    if (result2[0].num) {
      let result2 = { code: 0, msg: 'Email已存在' };
      ctx.body = result2;
    } else {
      const sql = `insert  INTO  user(username,email,password)  values ('${username.value}','${email.value}','${password.value}')`;
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