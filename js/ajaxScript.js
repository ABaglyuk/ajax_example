window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let inputRUB = document.querySelector('.rub'),
        inputUSD = document.querySelector('.usd');

    inputRUB.addEventListener('input', () => {
      let request = new XMLHttpRequest();
      
      //request.open(method, url, async, login, pass)

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    //status - код ответа (404, 200 , ...)
    //statusText - (текстовый ответ)
    //responseText/responce - (то что можно взять)
    //readyState - (текущее состояние (этап запроса))


    // readystatechange vs load, load - all is ok, readystatechange - можем отслеживать как идет запрос
    //                                             и идти по путям отслеживать запрос, более гибко
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            let data = JSON.parse(request.response);

            inputUSD.value = inputRUB.value / data.usd;

	    if(inputRUB.value == '') {
            inputUSD.value = '';
            } 
        } else {
            inputUSD.value = "Что-то пошло не так!";
        }
    });

    });

});