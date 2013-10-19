

function JawBone(url) {
  this.url = url;
  this.client_id = "nrukJB8L_uc";
  this.appSecret = "353b43344e3eace2a538830681f0a04b6e3de8c2";

  var getPToken = function () {
    var matchResult = url.match(/\?code=(.*)/);
    var tempToken = "";
    var pTokenPrefix = "https://jawbone.com/auth/oauth2/token?client_id=nrukJB8L_uc&353b43344e3eace2a538830681f0a04b6e3de8c2&grant_type=authorization_code&code=";
    var pTokenURL = pTokenPrefix;
    if(matchResult) {
      tempToken = matchResult[1];
      pTokenURL += tempToken;
      console.log(pTokenURL);
      $.ajax({
        url:pTokenURL,
        dataType:"json",
        success: function(response) {
          console.log(response);
          var pToken = response.access_token;
          var fireBase = new Firebase("https://ccraze.firebaseio.com/users/"+myUser.id).child("access_token").set(pToken);
        }
      });
    }
  }

}

$(document).ready(function() {


  //console.log(window.location.href);
  console.log("hello!");
  var jb = new JawBone(window.location.href);
  jb.getPToken();
}
