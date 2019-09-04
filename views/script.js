var LIS = document.querySelectorAll('li');
var CONTAINER = document.getElementById('container');
var TITLE = document.getElementById('title');
for (let i = 0; i < LIS.length; i++) {

    
    LIS[i].addEventListener('click', function () {
        var IMG = this.querySelector('img');
        var newIMG = IMG.cloneNode();

        var txt = newIMG.src.match(/\-\-(.*)\.png$/i);
        console.log(txt)
        TITLE.innerHTML = txt && txt[1] ? txt[1] : '';

        CONTAINER.innerHTML = ''
        CONTAINER.appendChild(newIMG);
    })
}

