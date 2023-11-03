const express = require('express');
const app = express();
app.use(express.json()); // для чтения body в JSON

const { checkAuth } = require('./auth/authMiddleware');
app.use(checkAuth);  

const apiRoute = require('./apiRoute');
app.use('/api', apiRoute);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Сервер API MySQL запущен на порту ${port}`);
});