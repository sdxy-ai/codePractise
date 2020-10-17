//这个文件中的内容是与建立起与数据库联系

const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '1000',
  database: 'login',
};

const db = {
  query(lan, params) {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(dbConfig);

      // 链接开始
      connection.connect(err => {
        if (err) {
          reject(err);
        }
      });

      // 进行数据处理
      connection.query(lan, params, (err, rows, fields) => {
        if (err) {
          reject(err);
        }
        // 进行处理
        resolve(rows);
      });

      // 链接结束
      connection.end(err => {
        if (err) {
          reject(err);
        }
      });
    });
  },
};

module.exports = db;