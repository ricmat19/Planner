let dayBoxes = document.querySelector(".day-boxes");
let dayBox = document.querySelectorAll('.day-box');
let monthTitle = document.querySelector('.month-title');
let currentWeekDay = new Date().getDay();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let monthBack = document.querySelector('.month-back');
let monthForward = document.querySelector('.month-forward');
let daysInMonth = "";
let thisIndent = "";
let lastIndent = "";
let monthChange = "";

displayMonth(currentMonth);

function monthDays(year, month){

    return new Date(year, month, 0).getDate();

}

function forwardIndent(indent, daysLastMonth){

    let lastIndentedMonth = indent + daysLastMonth;

    let remaining = 42 - lastIndentedMonth;

    if(remaining > 7){
        remaining -= 7;
    }

    let newIndent = 7 - remaining;

    for(let i = 0; i < newIndent; i++){

        dayBoxes.innerHTML += '<div class=""><div class="center-num"></div></div>';

    }

    return lastIndent = newIndent;

}

function backIndent(indent){

    console.log(indent)

    let backIndent = 0;
    if(indent !== 0){
        backIndent = 7 - indent;
    }

    for(let i = 0; i < backIndent; i++){

        dayBoxes.innerHTML += '<div class=""><div class="center-num"></div></div>';

    }

    let frontIndent = 0;

    if(dayBoxes.childElementCount > 35){
        frontIndent = 42 - dayBoxes.childElementCount;
    }else{
        frontIndent = 35 - dayBoxes.childElementCount;
    }

    let frontBoxes = "";

    for(let i = 0; i < frontIndent; i++){

        frontBoxes += '<div class=""><div class="center-num"></div></div>';

    }

    dayBoxes.innerHTML = frontBoxes + dayBoxes.innerHTML;

    lastIndent = frontIndent;

}

function addCalBoxes(daysInMonth){

    for(let i = 1; i <= daysInMonth; i++){

        dayBoxes.innerHTML += '<div class="day day-box"><div class="center-num">' + i + '</div></div>';

    }

    thisIndent = 0;
}

monthBack.addEventListener("click", function monthBack(){

    let newMonth = "";
    
    if(currentMonth === 0){
        newMonth = 11;
    }else{
        newMonth = currentMonth - 1;
    }

    monthChange = "back";

    displayMonth(newMonth, monthChange);

    currentMonth = newMonth;

});

monthForward.addEventListener("click", function monthForward(){

    let newMonth = "";
    
    if(currentMonth === 11){
        newMonth = 0;
    }else{
        newMonth = currentMonth + 1;
    }

    monthChange = "forward";

    displayMonth(newMonth, monthChange);

    currentMonth = newMonth;

});

function displayMonth(selectedMonth, change){

    switch(selectedMonth){
        case 0: 
            monthTitle.innerHTML = "January" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 1);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 12);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 1: 
            monthTitle.innerHTML = "Febuary" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 2);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 1);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }
            break;
        case 2: 
            monthTitle.innerHTML = "March" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 3);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 2);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 3: 
            monthTitle.innerHTML = "April" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 4);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 3);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 4: 
            monthTitle.innerHTML = "May" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 5);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 4);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 5: 
            monthTitle.innerHTML = "June" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 6);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 5);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 6: 
            monthTitle.innerHTML = "July" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 7);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 6);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 7: 
            monthTitle.innerHTML = "August" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 8);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 7);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 8: 
            monthTitle.innerHTML = "September" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 9);

            if(currentMonth === 8 && currentYear === 2020){
                lastIndent = 6;
                change = "forward"
            }

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 8);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 9: 
            monthTitle.innerHTML = "October" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 10);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 9);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 10: 
            monthTitle.innerHTML = "November" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 11);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 10);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
        case 11: 
            monthTitle.innerHTML = "December" + " " + currentYear;
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 12);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 11);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent);
            }

            break;
    }
}
