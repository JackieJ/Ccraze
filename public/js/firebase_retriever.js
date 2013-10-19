		
var firebaseio_url = "https://ccraze.firebaseio.com/"
var callBackValue; 

function getValue(path) {
	var dataRef = new Firebase(firebaseio_url + path);
	dataRef.on('value', function(snapshot) {
  		callBackValue = snapshot.val();
	});
}

function getCompetitionsOfGroup(group_id) {
	getValue("groups/" + group_id + "/inCompetition");
}

function getUsersInGroup(group_id) {
	getValue("groups/" + group_id + "/members");
}

function getGroupsInCompetition(competition_id) {
	getValue("competitions/" + competition_id + "groups")
}

function getGroupsOfUser(user_id) {
	getValue("users/" + user_id + "groups")
}