let cal = document.querySelector(".cal");
let dayBox = '';

function addCalDays(){

    cal.innerHTML += '';

    for(let i = 1; i <= 35; i++){

       cal.innerHTML += '<div class="day day-box"><div class="center-num">' + i + '</div></div>';

    }
}

addCalDays();
