
var firebaseio_url = "https://ccraze.firebaseio.com/"

// characteristics of GROUP
var COMPETITIONS = "competitions";
var MEMBERS = "members"

// characterstics of a user
var TWITTER_ID = "twitter_id"
var FACEBOOK_ID = "facebook_id"
var GROUPS = "groups"
var FRIENDS = "friends"

// characterstics of a competition
var GROUPS = "groups"

// check this value for return of getValue 
var callBackValue; 

function getValue(path) {
	var dataRef = new Firebase(firebaseio_url + path);
	dataRef.on('value', function(snapshot) {
  		callBackValue = snapshot.val();
      updateHTML(callBackValue);
	});
}

function getCompetitionsOfGroup(group_id) {
	getValue("groups/" + group_id + "/" + COMPETITIONS);
}

function getUsersInGroup(group_id) {
	getValue("groups/" + group_id + "/" + MEMBERS);
}

function getGroupsInCompetition(competition_id) {
	getValue("competitions/" + competition_id + "/" + GROUPS);
}

function getGroupsOfUser(user_id) {
	getValue("users/" + user_id + "/" + GROUPS)
}
