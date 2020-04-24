/*****************************************
******************************************

Whole page code developed by Bhavika Patel

******************************************
*****************************************/

//onload function
window.onload = function(){
    
    //login button click event function
    document.getElementById("login").onclick = function() {
        
        //get the values of username text box
        let userName = document.getElementById("username").value;
        
        
        //check with the static value of username and store that value in session storage
        if(userName == 'admin'){
            sessionStorage.setItem("username", userName);
            document.location = "calendar.html";
        }
        
        //code if there is wrong entry (Error message should be printed but since this this static so the message is different)
        else{alert("enter 'admin' as user name");}
    }
}