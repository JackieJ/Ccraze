
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

function getValue(path,callback) {
	var dataRef = new Firebase(firebaseio_url + path);
	dataRef.on('value', function(snapshot) {
  		callBackValue = snapshot.val();
      	callback(callBackValue);
	});
}

function getCompetitionsOfGroup(group_id,callback) {
	getValue("groups/" + group_id + "/" + COMPETITIONS,callback);
}

function getUsersInGroup(group_id,callback) {
	getValue("groups/" + group_id + "/" + MEMBERS,callback);
}

function getGroupsInCompetition(competition_id,callback) {
	getValue("competitions/" + competition_id + "/" + GROUPS,callback);
}

function getGroupsOfUser(user_id,callback) {
	getValue("users/" + user_id + "/" + GROUPS,callback)
}

function getUserObject(user_id, callback) {
	getValue("users/" + user_id, callback);
}
