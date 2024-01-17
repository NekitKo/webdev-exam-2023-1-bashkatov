'use strict';
const url = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=26a75d98-76bf-48a8-9acd-e75e991c56cb");
const pang = {
   page: 1,
   finp: 4,
   counter: 0,
};
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
   
   clear(tbody);

   pang.counter = Math.ceil(data.length / pang.finp);
   var st = (pang.page - 1) * pang.finp;
   var end = st + pang.finp;
   var displayedData = data.slice(st, end);

   // Цикл по каждому элементу данных
   for (var i = 0; i < displayedData.length; i++) {
      var obj = displayedData[i];
      var row = tbody.insertRow();

      var title = row.insertCell();
      title.innerHTML = obj.name;
      
      var description = row.insertCell();
      description.innerHTML = obj.description;
      
      var objects = row.insertCell();
      var btns = row.insertCell();
      
      var mainObject = obj.mainObject;
      var mainObjectCell = document.createElement('ul');
      var list = document.createElement('list');
      list.textContent = mainObject;
      mainObjectCell.appendChild(list);      
      objects.appendChild(mainObjectCell);
      
      var btn = document.createElement('button');
      btn.textContent = 'Выбрать';
      btns.appendChild(btn);
   }
      
}

function clear(body){
   body.innerHTML = '';
}

function getNextPage() {
   if (pang.page < pang.counter) {
      pang.page++;
      getData();
   }
}
      
function getBackPage() {
   if (pang.page > 1) {
      pang.page--;
      getData();
   }
}

// Вызов функции для получения данных
window.onload = () => {
   getData();
};