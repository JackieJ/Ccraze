//userpage.js

window.onload = function(){
	console.log(window.location.href);
}
var groups;
//var htmlObject;
$(document).ready(function(){
    var htmlObject = new Object;
    getGroupsOfUser(5,function(data){
        htmlObject.userStats = data;
        groups = data;
        updateHTML(htmlObject); 
    });
    for(i in groups){
        getUsersInGroup(groups[i],function(data){
            alert(data);
        });
    }
    htmlObject.test = "hello";
    
});

function updateHTML(htmlObject){
    $('#user-stats-module').html(htmlObject.userStats);
    $('#world-stats-module').html(htmlObject.test);
    $('#competitions-module').html(htmlObject.test);
    $('#goals-module').html(htmlObject.test);
}