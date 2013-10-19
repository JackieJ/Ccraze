var map;
var mapOn = false;
var resultDisplayInterval;
var listOfSchools = ['Carnegie Mellon University',
'University of Pittsburgh',
'Duquesne University',
'Allegheny Community College',
'Harvard University'
];

var collegeLocations = {
'Carnegie Mellon University':{lb:40.4438443,mb:-79.942746},
'University of Pittsburgh':{lb:40.444040,mb:-79.96240},
'Duquesne University':{lb:40.436430,mb:-79.99068},
'Allegheny Community College':{lb:40.4780311,mb:-79.9519729},
'Harvard University':{lb:42.366661,mb:-71.1248016},

};

window.onload = function(){
    $('.result').on('click',function(){
        alert($(this).html);
    });
}

function closeness(toTest,input){
    var outRating = 0;
    input = input.toLowerCase();
    toTest = toTest.toLowerCase();
    for( i in toTest){
        var index = input.indexOf(toTest[i]);
        if (index != -1) {
            outRating++;
            input = input.substring(0,index)+input.substring(index+1);
        }
    }
    return outRating;
}

function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(40.44361577, -79.9446773),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

function collegeClick(college){}

function showMap(){
    $('.welcome').animate({marginTop:-200});
    $('.results').fadeIn();
    $('#map-canvas').animate({opacity:1});
    $('#map-canvas').addClass('pointer-events-on');
    mapOn = true; 
}

function hideMap(){
    $('.welcome').animate({marginTop:0});
    $('.results').fadeOut();
    $('#map-canvas').animate({opacity:0});
    $('#map-canvas').removeClass('pointer-events-on');
    mapOn = false;
}

var displayFunc = function(text){
    var outList = listOfSchools.sort(function(a,b){
                        return closeness(b,text)-closeness(a,text);
                });
        var outHtml = "";
    for (var i=0; i<5; i++) outHtml += ("<div class='result'>"+outList[i]+"</div>");
    $('.results').html(outHtml);
    if(mapOn == false && text != ''){
        showMap();
    } else if (text == '' && mapOn==true) {
        hideMap();
    }
    return false;
}
