  # API Server для MySQL📝  
  Получение данных при помощи сохраненных SQL файлов из базы MySQL  в формате JSON
  
  ## Запуск сервера 🚀  
  npm run dev - для редактирования кода  
  npm run start - для продакшн  
   или  node server.js  
   

  ## Запросы
  Принимаются только POST запросы  
  SQL, которые содержат параметры должны  
  иметь в body параметры в JSON

  ### POST  (примеры)
 

Простой запрос  
POST:http://localhost:3000/api/test  

SQL: select id, name, pass from users 

Запрос с параметром  
POST:http://localhost:3000/api/test_param  
BODY: {"id":100}  
SQL: select id, name, pass from users where id =?

Запрос с несколькими параметрами  
POST: http://localhost:3000/api/test_param_d  
BODY: {
    "data_edit": "2017-08-25",
    "id": 3
}  
SQL: select * from bludo_main where DATE(data_edit)=? and id=?

Простой запрос с Basic Auth - запросы с префикосм ath_  
POST:http://localhost:3000/api/ath_test  
Auth: Basic dGVzdDp0ZXN0  // user1 , pass1 - то что в users.json  
SQL: select id, name, pass from users  
