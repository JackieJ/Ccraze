var firebaseio_url = "https://ccraze.firebaseio.com/";

// characteristics of GROUP
var COMPETITIONS = "competitions";
var MEMBERS = "members";

// characterstics of a user
var TWITTER_ID = "twitter_id";
var FACEBOOK_ID = "facebook_id";
var GROUPS = "groups";
var FRIENDS = "friends";
var EMAIL = "email";

// characterstics of a competition
var GROUPS = "groups";

// GROUPS 
function addGroup(group_name) {
	var ref = new Firebase(firebaseio_url + "groups").child(group_name);
	ref.child(COMPETITIONS).set("");
	ref.child(MEMBERS).set("");
}

function addMembersToGroupOnly(group_name, members) {
	var groupRef = new Firebase(firebaseio_url + "groups").child(group_name);
	groupRef.child(MEMBERS).set(members);
}

// USE THIS.
function addMembersToGroup(group_name, members) {
	addMembersToGroupOnly(group_name, members)

	for ( member in members ) {
		addGrouptoUserOnly(membre, group_name);
	}
}

function addCompetitionsToGroupOnly(group_name, competitions) {
	var groupRef = new Firebase(firebaseio_url + "groups").child(group_name);
	groupRef.child(COMPETITIONS).push(competitions);
}

// USE THIS
function addCompetitionsToGroup(group_name, competitions) {
	addCompetitionsToGroupOnly(group_name, competitions);

	for ( comp in competitions) {
		addGroupToCompetitionOnly(comp, group_name)
	}
}

// COMPETITIONS
function addCompetition(competition_name) {
	var ref = new Firebase(firebaseio_url + "competitions/").child(competition_name);
	ref.child(GROUPS).set("");
}

function addGroupToCompetitionOnly(competition_name, group_name) {
	var compRef = new Firebase(firebaseio_url + "competitions/" + competition_name);
	compRef.child(GROUPS).push(group_name);
}

// USE THIS
function addGroupToCompetition(competition_name, group_name) {
	addGroupToCompetitionOnly(competition_name, group_name);

	addCompetitionsToGroupOnly(group_name, [competition_name]);
}

// USER 
// function addUser is done in user.js
function addGrouptoUserOnly(user_name, group_name) {
	var userRef = new Firebase(firebaseio_url + "users/" + user_name);
	userRef.child(GROUPS).push(group_name);
}

function addGrouptoUser(user_name, group_name) {
	addGrouptoUserOnly(user_name, group_name)

	addMembersToGroupOnly(group_name, [user_name]);
}

// add a usera -> friend -> userb and userb -> friend -> usera 
function addFriendMutual(user_name1, user_name2) {
	new Firebase(firebaseio_url + "users/" + user_name1).child(FRIENDS).push(user_name2);
	new Firebase(firebaseio_url + "users/" + user_name2).child(FRIENDS).push(user_name1);
}