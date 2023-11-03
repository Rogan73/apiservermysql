// Входная строка в формате ISO 8601
const convDate = (inputDate)=>{//"2023-03-13T23:00:00.000Z";

    // Создаем объект Date из входной строки
    const dateObject = new Date(inputDate);
    
    // Получаем день, месяц, год, часы, минуты и секунды
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');
    
    // Форматируем дату и время
    return  `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
    
    module.exports = {convDate};