
const basicAuth = require('express-basic-auth');
const fs = require('fs');

// Определите пользователей и пароли, которые будут использоваться для Basic Auth
let users = {};

try {
    const usersData = fs.readFileSync('./auth/users.json', 'utf8');
    users = JSON.parse(usersData);
  } catch (error) {
    console.error('Ошибка при чтении файла JSON:', error);
    process.exit(1); // Завершаем приложение в случае ошибки
  }


// Функция для проверки авторизации
const checkAuth = (req, res, next) => {
  // Проверка, нужно ли применять авторизацию к текущему маршруту
  if (req.originalUrl.startsWith('/api/ath_')) {
    return basicAuth({
      users,
      challenge: true,
      unauthorizedResponse: { error: 'Unauthorized', "result": false },
    })(req, res, next); // Применение миддлвэра для Basic Auth
  }
  // Если не нужно применять авторизацию, переходите к следующему маршруту
  next();
};

module.exports = {  checkAuth };




