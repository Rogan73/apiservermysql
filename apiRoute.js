const express = require('express');
const router = express.Router();

const fs = require('fs');
const util = require('util');
const { pool } = require('./db');
const { convDate } = require('./helpers');

// Промисифицируйте методы чтения файлов
const readFile = util.promisify(fs.readFile);

// Определите функцию convDate, если она не определена

// Роут для обработки запросов
router.post('/:sqlFileName', async (req, res) => {
  const { sqlFileName } = req.params;
  const sqlFilePath = `./sql/${sqlFileName}.sql`;
  let queryParameters = req.body; // Параметры выполнения запроса в формате JSON

//console.log('queryParameters',queryParameters);

  try {
    // Прочтите SQL-запрос из файла
    let sqlQuery = await readFile(sqlFilePath, 'utf-8');

    const connection = await pool.getConnection(); // Используйте пул для получения соединения
    //let results;

    try {

      if (Object.keys(queryParameters).length > 0) {
        // Если есть параметры, выполните запрос с ними
        //console.log('params', Object.values(queryParameters));
        [results, fields] = await connection.query(sqlQuery, Object.values(queryParameters));  
      } else {
        // Если параметры отсутствуют, выполните запрос без них
        [results, fields] = await connection.query(sqlQuery);
      } 


    //  const [results, fields] = await connection.query(sqlQuery);

      let REC_NO = 1;
      const rows = results.map(row => {
        const rowData = {};
        rowData['REC_NO'] = REC_NO++;
        for (const fieldName in row) {
          if (row.hasOwnProperty(fieldName)) {
            //if ((fieldName == 'DATA') || (fieldName == 'TIM')) {
              if (fieldName.includes('DATA') || fieldName.includes('TIM')) {  
              rowData[fieldName] = convDate(row[fieldName]);
            } else {
              let val = row[fieldName];
              if (typeof val === 'number') {
                rowData[fieldName] = parseFloat(val.toFixed(3));
              } else {
                rowData[fieldName] = val;
              }
            }
          }
        }
        return rowData;
      });

      res.json({
        "result": true,
        "error": "",
        "table": {
          rows,
          "record_count": REC_NO - 1
        }
      });
    } finally {
      connection.release(); // Освобождение соединения обратно в пул
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ result: false, error: '02 ' + error.message });
  }
});

module.exports = router;
