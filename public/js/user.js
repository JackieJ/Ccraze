var ref = new Firebase("https://ccraze.firebaseio.com");

// global user (is this a good thing?)
myUser = -1;

function addUser(email, password){
  authClient.createUser(email, password, function (error, user) {
    if (!error) {
      console.log('logging new registered user');
      doLogin(email, password);
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
    $("#register-form").hide();
    setTimeout("location.href = '/';",1000);
  });

  $("#login-submit").click(function (e) {
    e.preventDefault();
    var email = $("#login-email").val();
    var password = $("#login-password").val();
    doLogin(email, password);
    location.href = '/' + 'jawbone';
  });

  $("#opener-logout").click(function () {
    authClient.logout();
  });
});


var authClient = new FirebaseAuthClient(ref, function (error, user) {
  if (error) {
    alert(error);
    return;
  }
  if (user) {
    if ($('#login-email').length > 0) {
      location.href = '/' + 'jawbone';
    }
    // User is already logged in.
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    myUser = user;
    $('.userId').html(user.id);
    // doLogin(user);
    console.log('logged in')
  $("#data").attr('disabled', false);
$("#opener-logout").attr('disabled', false);
$("#opener-login").attr('disabled', true);
  } else {
    // User is logged out.
    console.log('logged out');
    $("#data").attr('disabled', true);
    $("#opener-logout").attr('disabled', true);
    $("#opener-login").attr('disabled', false);
    // ("#dialog-form").dialog("open");
  }
});
