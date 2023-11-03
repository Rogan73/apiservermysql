const dotenv = require('dotenv');
dotenv.config(); // Загрузка переменных окружения из файла .env

const mysql = require("mysql2/promise"); // Обратите внимание на /promise

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD
});

module.exports = { pool }; // Экспортируйте пул соединений вместо отдельного соединения
