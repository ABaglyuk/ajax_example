let message = {
    loading : 'Загрузка...',
    success : 'Спасибо! Скоро мы с вами свяжемся',
    failure : 'Что-то пошло не так...'
};

let form = document.querySelector('.main-form'),
    input = document.querySelector('input'),
    statusMessage = document.createElement('div');

statusMessage.classList.add('status');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // При отправлении JSON
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // let obj = {};

    // formData.forEach(function(value,key) {
    //     obj[key] = value;
    // });

    // let json = JSON.stringify(obj);
    // request.send(json);

    let formData = new FormData(form);
    request.send(formData);

    request.addEventListener('readystatechange', function() {
        if(request.readystate < 4) {
            statusMessage.innerHTML = message.loading;
        } else if(request.readystate ===4 && request.status === 200) {
            statusMessage.innerHTML = message.success;
        } else {
            statusMessage.innerHTML = message.failure;
        }
    });

    for(let i = 0; input.length; i++) {
        input[i].value = '';
    }
});