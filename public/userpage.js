//userpage.js

function JawBone(url) {
    this.url = url;
    this.client_id = "ITn61XJrBlU";
    this.appSecret = "4e6d0aaf44a60ac372938d44dc51ed7f91f7fea6";
        
    var getPToken = function () {
        var matchResult = url.match(/\?code=(.*)/);
        var tempToken = "";
        var pTokenPrefix = "https://jawbone.com/auth/oauth2/token?client_id=ITn61XJrBlU&client_secret=4e6d0aaf44a60ac372938d44dc51ed7f91f7fea6&grant_type=authorization_code&code=";
        var pTokenURL = pTokenPrefix;
        if(matchResult) {
            tempToken = matchResult[1];
            pTokenURL += tempToken;
            console.log(pTokenURL);
        }
    }

}

$(document).ready(function() {
    //console.log(window.location.href);
    console.log("hello!");
    var jb = new JawBone(window.location.href);
    jb.getPToken();
}