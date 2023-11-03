const mysql = require("mysql2/promise"); // Обратите внимание на /promise

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "libro",
  password: ""
});

module.exports = { pool }; // Экспортируйте пул соединений вместо отдельного соединения
