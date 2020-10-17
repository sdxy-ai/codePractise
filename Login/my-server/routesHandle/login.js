const db = require('../db/index');


module.exports = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  try {
    // 应该是后面多个括号
    // 多条件查询的语句是这样的哈，有and/or之类的
    const sql = `select count(*) as num from user where username="${username.value}" and password="${password.value}"`;
    let result = await db.query(sql)

    if (result[0].num) {
      let result = { code: 1, msg: '登录成功' };
      ctx.body = result;
    } else {
      let result = { code: 0, msg: '登录失败,用户名和密码不正确' };
      ctx.body = result;
    }
  } catch (error) {
    // 你看终端他报错了，所以走这个catch，这个catch没有给ctx.body赋值，所以404
    console.log('[SELECT ERROR] - ', error.message)
    // 这样其实也不太好
    ctx.throw(500, '后台报错')
  }
}
