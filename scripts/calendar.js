let dayBoxes = document.querySelector(".day-boxes");
let monthTitle = document.querySelector('.month-title');
let currentWeekDay = new Date().getDay();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let monthBack = document.querySelector('.month-back');
let monthForward = document.querySelector('.month-forward');
let daysInMonth = "";
let lastIndent = "";

displayMonth(currentMonth);

function monthDays(year, month){

    return new Date(year, month, 0).getDate();

}

function addIndent(lastIndent, daysLastMonth){

    let lastIndentedMonth = lastIndent + daysLastMonth;

    let remaining = 42 - lastIndentedMonth;

    let newIndent = 7 - remaining;

    for(let i = 0; i < newIndent; i++){

        dayBoxes.innerHTML += '<div class=""><div class="center-num"></div></div>';

    }

    lastIndent = newIndent;

}

function addCalBoxes(daysInMonth){

    for(let i = 1; i <= daysInMonth; i++){

        dayBoxes.innerHTML += '<div class="day day-box"><div class="center-num">' + i + '</div></div>';

    }
}

monthBack.addEventListener("click", function monthBack(){

    let newMonth = "";
    
    if(currentMonth === 0){
        newMonth = 11;
    }else{
        newMonth = currentMonth - 1;
    }

    displayMonth(newMonth);

    currentMonth = newMonth;

});

monthForward.addEventListener("click", function monthForward(){

    let newMonth = "";
    
    if(currentMonth === 11){
        newMonth = 0;
    }else{
        newMonth = currentMonth + 1;
    }

    displayMonth(newMonth);

    currentMonth = newMonth;

});

console.log(lastIndent);

function displayMonth(selectedMonth){

    switch(selectedMonth){
        case 0: 
            monthTitle.innerHTML = "January";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 1);
            daysLastMonth =  monthDays(currentYear, 12);
            console.log(lastIndent);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 1: 
            monthTitle.innerHTML = "Febuary";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 2);
            daysLastMonth =  monthDays(currentYear, 1);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 2: 
            monthTitle.innerHTML = "March";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 3);
            daysLastMonth =  monthDays(currentYear, 2);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 3: 
            monthTitle.innerHTML = "April";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 4);
            daysLastMonth =  monthDays(currentYear, 3);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 4: 
            monthTitle.innerHTML = "May";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 5);
            daysLastMonth =  monthDays(currentYear, 4);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 5: 
            monthTitle.innerHTML = "June";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 6);
            daysLastMonth =  monthDays(currentYear, 5);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 6: 
            monthTitle.innerHTML = "July";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 7);
            daysLastMonth =  monthDays(currentYear, 6);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 7: 
            monthTitle.innerHTML = "August";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 8);
            daysLastMonth =  monthDays(currentYear, 7);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 8: 
            monthTitle.innerHTML = "September";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 9);
            daysLastMonth =  monthDays(currentYear, 8);

            if(currentMonth === 8 && currentYear === 2020){
                lastIndent = 6;
            }

            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 9: 
            monthTitle.innerHTML = "October";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 10);
            daysLastMonth =  monthDays(currentYear, 9);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 10: 
            monthTitle.innerHTML = "November";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 11);
            daysLastMonth =  monthDays(currentYear, 10);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
        case 11: 
            monthTitle.innerHTML = "December";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 12);
            daysLastMonth =  monthDays(currentYear, 11);
            addIndent(lastIndent, daysLastMonth);
            addCalBoxes(daysInMonth);
            break;
    }
}
