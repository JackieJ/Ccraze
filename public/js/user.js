var ref = new Firebase("https://ccraze.firebaseio.com");

// global user (is this a good thing?)
myUser = -1;

// add the user to the traditional firebase db
function addUserToFirebase(email) {
  ref.child("users").update(email);
}

function addUser(email, password) {
  authClient.createUser(email, password, function (error, user) {
    if (!error) {
      console.log('logging new registered user');
      doLogin(email, password);
      $("#register-form").hide();
      setTimeout("location.href = '/';",1000);

      addUserToFirebase(email);
    } else {
      alert(error);
    }
  });
}

function doLogin(email, password) {
  authClient.login('password', {
    email: email,
    password: password
  });
};

$(function () {
    $("#register-submit").click(function (e) {
    var email = $("#register-email").val();
    var password = $("#register-password").val();
    addUser(email, password);
  });

  $("#login-submit").click(function (e) {
    e.preventDefault();
    var email = $("#login-email").val();
    var password = $("#login-password").val();
    if (doLogin(email, password)) {
      setTimeout("location.href = '/jawbonelogin';",500);
    }
  });

  $("#opener-logout").click(function () {
    authClient.logout();
    location.href = "/";
  });
    
    var initialHandshake1 = "https://jawbone.com/user/signin/login?email=liveaeon@gmail.com&pwd=jawbone8888&service=nudge"
    
    //jawbone handshakes
    $("#jawbone").click(function () {
        //first ajax call to 
        $.ajax({
            url:initialHandshake1
            
        }).done(function(data){
            //we need to get the data object
            console.log(data.user.goals.move);
        });
    });
});

var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
  if (error) {
    alert(error);
    return;
  }
  if (user) {
    if ($('#login-email').length > 0) {
      location.href = '/jawbonelogin';
    }
    // User is already logged in.
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    myUser = user;
    // doLogin(user);
    console.log('logged in')
  } else {
    // User is logged out.
    console.log('logged out');
  }
});
