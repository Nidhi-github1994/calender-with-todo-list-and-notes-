/**********************************************
***********************************************

Whole page code developed by Nidhi Umang Parekh

***********************************************
**********************************************/





//function to check for the session set or not 
function checkSession(){
    let username = sessionStorage.getItem("username");
    if(username == 'admin'){
        return true;
    }
    else{
        document.location = "login.html";
    }
}


//function to load the widget as per secelction
var loadPage = function(){
    let pageName = this.id;
    document.location = pageName + ".html";
    }


//function which loads the UI widget
function jqueryUiCode(){
    $( function() {
    $( "#tabs" ).tabs();});
}


//single function to save the notes for all the type with dynamis variable 
let saveNotes = function(){
    let currentButton = this;
    let currentTextArea = currentButton.nextElementSibling;
    
    //get the value of the clicked save button's sibling textarea
    let textValue = currentTextArea.value;
    
    //set dynamic local storage variable same as the textarea's id 
    let localstorageVariable = currentTextArea.id;
    
    //code that ensure blank entry is not there 
    if(textValue != ""){
        
        //if the localstorage value is not null then get that value first and combine that with currently added value
        if(localStorage.getItem(localstorageVariable) != null){
            let storedItems =  localStorage.getItem(localstorageVariable);
            localStorage.setItem(localstorageVariable, storedItems + "<li>" + textValue + "</li>");
            }
        
        //if the localstorage value is null then set the currently added value
        else{
            localStorage.setItem(localstorageVariable, "<li>" + textValue + "</li>");
        }
        
        //print the value in the respective below notes card
        let noteCardId = localstorageVariable.substr(4,localstorageVariable.length) + "notesdisplay";
        document.getElementById(noteCardId).innerHTML += "<li>" + textValue + "</li>";
        currentTextArea.value = "";
    }
    
}


//function to display the notes when page loads first time
function getNotes(){
    document.getElementById("officenotesdisplay").innerHTML = localStorage.getItem("textoffice");
    document.getElementById("personalnotesdisplay").innerHTML = localStorage.getItem("textpersonal");
    document.getElementById("othernotesdisplay").innerHTML = localStorage.getItem("textother");
}


//windows load function
window.onload = function(){
    
    //ckeck whether session variable is set or not
    if(checkSession()){
        jqueryUiCode();

        //left navigation tabs
        document.getElementById("notes").onclick = loadPage;
        document.getElementById("calendar").onclick = loadPage;
        
        //load the notes stored in local storage
        getNotes();
        
        
        let content = document.getElementById("content");
        let saveNotesButtons = content.getElementsByTagName("button");

        //save the notes on the save button click 
        for(let i in saveNotesButtons){
            saveNotesButtons[i].onclick = saveNotes;
        }
    }
}


    
    

 