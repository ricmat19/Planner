let dayBoxes = document.querySelector(".day-boxes");
let monthTitle = document.querySelector('.month-title');
let currentWeekDay = new Date().getDay();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let monthBack = document.querySelector('.month-back');
let monthForward = document.querySelector('.month-forward');
let daysInMonth = "";
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

function backIndent(indent, daysThisMonth){

    console.log(indent);

    let newIndent = 7 - indent;

    for(let i = 0; i < newIndent; i++){

        dayBoxes.innerHTML += '<div class=""><div class="center-num"></div></div>';

    }

    return lastIndent = newIndent;

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
            monthTitle.innerHTML = "January";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 1);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 12);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 1: 
            monthTitle.innerHTML = "Febuary";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 2);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 1);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }
            break;
        case 2: 
            monthTitle.innerHTML = "March";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 3);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 2);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 3: 
            monthTitle.innerHTML = "April";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 4);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 3);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 4: 
            monthTitle.innerHTML = "May";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 5);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 4);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 5: 
            monthTitle.innerHTML = "June";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 6);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 5);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 6: 
            monthTitle.innerHTML = "July";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 7);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 6);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 7: 
            monthTitle.innerHTML = "August";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 8);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 7);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 8: 
            monthTitle.innerHTML = "September";
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
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 9: 
            monthTitle.innerHTML = "October";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 10);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 9);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 10: 
            monthTitle.innerHTML = "November";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 11);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 10);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
        case 11: 
            monthTitle.innerHTML = "December";
            dayBoxes.innerHTML = '';
            daysInMonth = monthDays(currentYear, 12);

            if(change === "forward"){
                daysLastMonth =  monthDays(currentYear, 11);
                forwardIndent(lastIndent, daysLastMonth);
                addCalBoxes(daysInMonth);
            }
            if(change === "back"){
                addCalBoxes(daysInMonth);
                backIndent(lastIndent, daysInMonth);
            }

            break;
    }
}
