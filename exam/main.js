'use strict';
const url = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=26a75d98-76bf-48a8-9acd-e75e991c56cb");
function getData() {
    var xhr = new XMLHttpRequest();
   
    // Запрос GET к серверу
    xhr.open('GET', url, true);
   
    // Обработка ответа от сервера
    xhr.onload = function() {
       if (xhr.status === 200) {
         // Парсинг JSON-объекта
         var data = JSON.parse(xhr.responseText);
   
         // Вывод информации на страницу
         displayData(data);
       } else {
         console.error('Ошибка:', xhr.status);
       }
    };
   
    // Обработка ошибок
    xhr.onerror = function() {
       console.error('Ошибка при запросе данных');
    };
   
    // Отправка запроса
    xhr.send();
}
   
// Функция для вывода информации на страницу
function displayData(data) {
    var table = document.getElementById('path');
    var tbody = table.getElementsByTagName('tbody')[0];
   
    // Очистка таблицы от старых данных
    while (tbody.firstChild) {
       tbody.removeChild(tbody.firstChild);
    }
   
    // Цикл по каждому элементу данных
    for (var i = 0; i < data.length; i++) {
       var row = document.createElement('tr');
       var nameCell = document.createElement('td');
       var descriptionCell = document.createElement('td');
       var mainObjectCell = document.createElement('td');
       var button = document.createElement('button');

       nameCell.textContent = data[i].name;
       descriptionCell.textContent = data[i].description;
       mainObjectCell.textContent = data[i].mainObject;
       button.textContent = 'Выбрать';

       row.appendChild(nameCell);
       row.appendChild(descriptionCell);
       row.appendChild(mainObjectCell);
       row.appendChild(button);

       tbody.appendChild(row);
    }
}

// Вызов функции для получения данных
getData();