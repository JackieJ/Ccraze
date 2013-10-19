var ref = new Firebase("https://zephoku.firebaseio.com");

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
  $("#dialog-register").dialog({
    autoOpen: false,
    buttons: {
      "ok": function () {
        var email = $("#register-email").val();
        var password = $("#register-password").val();
        
        addUser(email, password);
        $(this).dialog("close");
      },
    Cancel: function () {
      $(this).dialog("close");
    }
    }
  });

  $("#dialog-login").dialog({
    autoOpen: false,
    buttons: {
      "ok": function () {
        console.log('trying to login: ' + $("#login-email").val());

        var email = $("#login-email").val();
        var password = $("#login-password").val();

        doLogin(email, password);
        $(this).dialog("close");
      },
    Cancel: function () {
      $(this).dialog("close");
    }
    }
  });

  $("#register-submit").click(function (e) {
    e.preventDefault();
    var email = $("#register-email").val();
    var password = $("#register-password").val();
    addUser(email, password);
    $("#register-form").hide();
    setTimeout("location.href = '/';",1500);
  });

  $("#opener-login").click(function () {
    $("#dialog-login").dialog("open");
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
