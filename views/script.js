var LIS = document.querySelectorAll('li');
var CONTAINER = document.getElementById('container');
for (let i = 0; i < LIS.length; i++) {

    
    LIS[i].addEventListener('click', function () {
        var IMG = this.querySelector('img');
        var newIMG = IMG.cloneNode();
        
        CONTAINER.innerHTML = '';
        CONTAINER.appendChild(newIMG);
    })
}

