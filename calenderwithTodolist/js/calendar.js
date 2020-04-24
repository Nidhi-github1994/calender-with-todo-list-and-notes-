/**********************************************
***********************************************

Whole page code developed by Nidhi Umang Parekh

***********************************************
**********************************************/




//function to check for the session is set or not  
function checkSession(){
    let username = sessionStorage.getItem("username");
    if(username == 'admin'){
        document.getElementById("username-display").innerHTML = "Welcome : " + username; 
        return true;
    }
    else{
        document.location = "login.html";
    }
}


//function which loads the page as the user select the app
let loadPage = function(){
    let pageName = this.id;
    document.location = pageName + ".html";
}


//global variables 
let month;
let year;
let eventList = [];


//Get the monthtext
let getMonthText = function(currentMonth) {
        if (currentMonth === 0) { return "January"; }
        else if (currentMonth === 1) { return "February"; }
        else if (currentMonth === 2) { return "March"; }
        else if (currentMonth === 3) { return "April"; }
        else if (currentMonth === 4) { return "May"; }
        else if (currentMonth === 5) { return "June"; }
        else if (currentMonth === 6) { return "July"; }
        else if (currentMonth === 7) { return "August"; }
        else if (currentMonth === 8) { return "September"; }
        else if (currentMonth === 9) { return "October"; }
        else if (currentMonth === 10) { return "November"; }
        else if (currentMonth === 11) { return "December"; }
};


//function to get last day of the month
let getLastDayofMonth = function(currentMonth) {
        var lastDay = new Date(); 
        lastDay.setMonth(currentMonth+1);
        lastDay.setDate(0);
        
        return lastDay.getDate();
};


//function display the calendar
let calendar = function(year,month){
        
        $("#month_year").text(getMonthText(month)+" "+year);
        let firstDayOfMonth = new Date(year,month);
        let lastDayofmonth = getLastDayofMonth(month);
        let html = $("#calendar-content").html();
        let date = 0;

        for (let i = 0; i < 6; i++) {
            html += "<tr>";
            for (let j = 0; j < 7; j++) {
                if(i === 0 && j < firstDayOfMonth.getDay()){
                    html += "<td></td>";
                }
                else if(date>=lastDayofmonth){
                    html += "<td></td>";
                }
                else{
                    date ++;
                    html+="<td>"+date+" "+"</td>";
                }
            }
            html += "</tr>";
            if(date>=lastDayofmonth){
                break;
            }
        }
        $("#calendar-content").html(html);
    
        //function which diaplay the events stored in loacal storage
       setTimeout(findCelltoDisplayEvent,1000);
};


//Next month function
let nextMonth = function(){
    if(month < 11){
        month++;
        let html = $("#calendar-content").empty();
        
        //call the calendar function with different month value
        calendar(year,month);
        
        //assign the click event to all the cells of table
        addRowHandlers();
    }
    else{document.getElementById("rightbutton").disabled = true;}
    
}


//Previous month function
let previousMonth = function(){
    
    if(month > 0){
        month--;
        let html = $("#calendar-content").empty();
        
        //call the calendar function with different month value
        calendar(year,month);
        
        //assign the click event to all the cells of table
        addRowHandlers();
    }
    else{document.getElementById("leftbutton").disabled = true;}
    
}


function storeLocalStorage(eventList){
    
    //get the stored values of local storage
    let previouslyStoreItem = localStorage.getItem("listOfEvents");
    
    //check if there is previously stored items than convert them in object or if no items there then creat an new array
    previouslyStoreItem = previouslyStoreItem ? JSON.parse(previouslyStoreItem) : [];
    
    //push the latest item in the local storage array
    previouslyStoreItem.push(eventList[eventList.length - 1]);
    
    //store the whole array in string formate in local storage
    localStorage.setItem('listOfEvents', JSON.stringify(previouslyStoreItem));
}



//click event for the table cells 
function addRowHandlers() {
    let table = document.getElementById("calendar-content");
    if (table != null) {
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++)
                
                //add the click events to all the table cells
                table.rows[i].cells[j].onclick = function () {
                if(this.innerHTML != ""){
                    
                    //when the cell is clicked the dialog function is called for that cell
                    eventDialog(this);
                }
            };
        }
    }
}

    
    
//dialogbox function
function eventDialog(tableCell) {
    
    //jquery function for dialog box
    $( function() {
        $( "#dialog" ).dialog({
            height: 500,
            width: 400,
            modal: true,
        });
    });
    
    //get the date of the clicked cell
    let day = tableCell.innerText.substr(0,2);
    let date = new Date(2020, month, day).toDateString();
    
    
    //get the inner text of the cell (if there is previously added events)
    let cellInnerText = tableCell.innerHTML;
    
    //display the date on the top of the dialog box 
    document.getElementById("eventDate").innerHTML = date;
    
    //diaplay the event list in the dialog box of that date 
    if(cellInnerText.length > 2 ){
        let displaySting = cellInnerText.substr(2,cellInnerText.length);
        document.getElementById("event-list").innerHTML = displaySting;
        
        //code for delete event item (get all the delete icons in array and call the function for clicked icon)
        let deleteIcons = document.getElementsByTagName("i");
        for(let i = 0; i < deleteIcons.length; i++){
            deleteIcons[i].onclick = deleteEvent;
        }
    }
    
    let bunchOfEvents = "";
    
    
    //when user add new event and click on the save button this function called 
    let printEvent = function(){
        let newEvent = document.getElementById("event").value;
        
        //check for blank value 
        if(newEvent != ""){
            
            //push the items in the array with date as key and event as a value 
            eventList.push({[date]: newEvent});
            
            //display the added events in the table cell 
            for (i in eventList){
            for (key in eventList[i]){
                if(key == date){
                    bunchOfEvents =  eventList[i][key] + "<i class='fa fa-trash'></i>";
                }
                
                //if there is any events already exist in the cell then first get that and merge that with the newly added evet and diaplay it
                if(cellInnerText.length > 2){
                    tableCell.innerHTML = cellInnerText ;
                    tableCell.innerHTML += "<li><span class='eventslist'>" + bunchOfEvents + "</span></li>";
                }
                
                //if there is no event exist then display the newly added event 
                else{tableCell.innerHTML = day+" " + "<br><span class='eventslist'>" + bunchOfEvents + "</span>";}
            }
        }
     }
        //null the value of the variable and the text box 
        newEvent = "";
        document.getElementById("event").value ="";
        
        //close the dialog box when user click on the save button
        $('#dialog').dialog('close');
        
        //call the function to store the array in the loacl storage storage
        storeLocalStorage(eventList);
    }
    
    //click event for the submit button in dialog box 
    document.getElementById("submit-event").onclick = printEvent;
}
            

//functon that delete the event
let deleteEvent = function(){
    
    //get the day for which the delete icon has been clicked 
    let selectedDay = document.getElementById("eventDate").innerHTML;
    
    //get the currently clicked icon and its parent list item 
    let currentDeleteIcon = this;
    let currentListItem = this.parentElement;
    let item = currentListItem.innerText;
    
    //hide the item from the list for wich delete icon has been clicked 
    currentListItem.style.display = 'none';
    
    //get the local storage string and convert that into the array 
    let storeItem = localStorage.getItem("listOfEvents");
    let storedEventlist = JSON.parse(storeItem);
    
    //find the deleted list item in the array and delete that item from the array 
    for(let i = 0; i < storedEventlist.length; i++){
        for(key in storedEventlist[i]){
            if(key == selectedDay){
                if(storedEventlist[i][key] == item){
                storedEventlist.splice(i, 1);
                }
            }
        }
        
    }
    
    //store back the updated array in the local storage in string formate 
    localStorage.setItem('listOfEvents', JSON.stringify(storedEventlist));
    $('#dialog').dialog('close');
    
    //call the function to display the updated events in the table cells 
    setTimeout(findCelltoDisplayEvent,1500);
    
}


//fuction to to find the cell which contains the events
let findCelltoDisplayEvent = function(){
    
    //get the local storage string and convert that into the array 
    let storeItem = localStorage.getItem("listOfEvents");
    let storedEventlist = JSON.parse(storeItem);
    
    //get table element and loop through its each cell
    let table = document.getElementById("calendar-content");
    if (table != null) {
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++)
                if (table.rows[i].cells[j].innerText != ""){
                    
                    //call the function to load the event for cell wich contains dates 
                   loadEvents(table.rows[i].cells[j], storedEventlist);
                }
            }
        }
}


//fuction to display the events for perticular cell
function loadEvents(cell, storedEventlist){
    
    //get the date of the call
    let day = cell.innerText.substr(0,2);
    let date = new Date(2020, month, day);
    
    //get today's date
    let todayDate = new Date();
    let bunchOfEvents = "";
    
    //code to highlight the today's date cell
    if(todayDate.setHours(0,0,0,0) == date.setHours(0,0,0,0)){
       cell.setAttribute("class", "today-cell");
    }
    
    //code to print the events where date of cell compared with the key of the local storage array and when the key matches the value will be printed in the cell
    date = new Date(2020, month, day).toDateString();
    
    //when there is alredy stored items in the local storage array 
    if(storedEventlist.length != 0){
        for ( let i = 0; i< storedEventlist.length; i++){
            for (key in storedEventlist[i]){
                if(key == date){
                    bunchOfEvents += "<li>" + storedEventlist[i][key] + "<i class='fa fa-trash'></i></li>";
                }
                cell.innerHTML = day +" " + "<span class='eventslist'>" + bunchOfEvents + "</span>";
            }
        }
    }
    
    //when there is no items in local storage array 
    else{cell.innerHTML = day;}
}
    


//onload function for the window 
window.onload = function(){
    
    //code execute if the session is stored 
    if(checkSession()){
        
        //left navigation tabs
        document.getElementById("notes").onclick = loadPage;
        document.getElementById("calendar").onclick = loadPage;

        //current month and year value
        month = 3;
        year = 2020;
        
        //draw the calendar for the given month and year
        calendar(year,month);
        
        //click events for the nextmonth and previousmonth buttons
        document.getElementById("rightbutton").onclick = nextMonth;
        document.getElementById("leftbutton").onclick = previousMonth;
    
        //function that add the click event to the all cell of calendar
        addRowHandlers();
    }
}







    


    
    
    
    
    
