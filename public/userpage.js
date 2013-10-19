//userpage.js

var groups;
var htmlObject;
$(document).ready(function(){
    htmlObject = new Object;
    //$('body').append("<div class='infoGFX infoGFX--goal'></div>");
    getInitialData();
});

function getInitialData(){
    console.log("called");
    getUserObject(1,function(data){
        console.log(data);
        htmlObject.userStats = data;
        htmlObject.competitions = data.groups;
        
        user = data;
        updateHTML('userStats'); 
        updateHTML('competitions'); 
        
    });
    /*for(i in groups){
        getUsersInGroup(groups[i],function(data){
            //alert(data);
        });
    }*/
    htmlObject.test = "hello";
    htmlObject.goals = "<div class='infoGFX infoGFX--goal'></div>";
    htmlObject.worldStats = "World stats"
    updateHTML('worldStats'); 
    updateHTML('userStats'); 
    updateHTML('goals');
    setInterval(function(){updateHTML('competitions');},500);
    setInterval(function(){updateHTML('worldStats');},500);
    
}

function getData(){
    console.log("called");
    getUserObject(1,function(data){
        htmlObject.userStats = data.email;
        groups = data;
        updateHTML('userStats'); 
    });
    for(i in groups){
        getUsersInGroup(groups[i],function(data){
            //alert(data);
        });
    }
}

function updateHTML(parameter){
    switch(parameter){
        case('userStats'):$.ajax({
            url: "http://192.249.58.243:3333",
            type: "GET",
        }).done(function(data){
            $('#user-stats-module').html("<div class='inner-module'>"+generateUserView(data)+"</div>");        });
            
            break;
        case('worldStats'):$.ajax({
                url: "http://192.249.58.243:3333/world",
                type: "GET",
            }).done(function(data){
                $('#world-stats-module').html("<div class='inner-module'>"+generateWorldStats(data)+"</div>");
            });
            break;
        case('competitions'):$.ajax({
                url: "http://192.249.58.243:3333/competitions",
                type: "GET",
            }).done(function(data){
                 $('#competitions-module').html("<div class='inner-module'>"+generateCompetitionView(data)+"</div>");
            });
            break;
        case('goals'):
            $('#goals-module').html("<div class='inner-module'><div class='module-title'>Goal</div>"+htmlObject.goals+"</div>");
            goalSample();
            break;
        default:
            return;
    }   
}

function generateWorldStats(worldStats){
    return "<div class='module-title'>World Stats</div><br/><span id='world-stats'>"+worldStats.calories+" Total Calories Burned Worldwide"+"</span>";
}
function generateUserView(user){

    //console.log(user);
    return "<div class='module-title'>"+user.user+"</div><br/><div class='module-body'>You have around "+user.percentage+"% of your goal left to achieve!</div>";
}

function generateCompetitionView(competitions){
    console.log("SDFSDF",competitions);
    usersDiv = "";
    count = 0;
    for(user in competitions.users){
        console.log(user);
        count += competitions.users[user];
        usersDiv += "<div>"+user+":  "+competitions.users[user]+"</div>";
    }
    return "<div class='module-title'>"+competitions.dateStart+"-"+competitions.dateEnd+"</div><div>"+count+" of "+competitions.goal+" calories fulfilled</div><div class='module-body'>"+usersDiv+"</div>"
}

function goalSample(){
    // SVG dimensions & colours
    var     WIDTH = 600,
            HEIGHT = 250,
            RADIUS = Math.min(WIDTH, HEIGHT) / 2,
            MARGIN = 20,
            SPACING = 10,
            ORANGE_DK = "#ffbb33",
            ORANGE_LT = "#ff8800",
            PURPLE_DK = "#9933cc",
            PURPLE_LT = "#ba9bc9",
            GREEN_DK = "#669900",
            GREEN_LT = "#99cc00",
            GRAY_DK = "#777777",
            GRAY_LT = "#a9a9a9";

    // ***** goal infographic *****
    // Mock incoming JSON dataset
    var goalJSON = {
        overview: {
            "goal": 100,
            "completed": 25
        },
        breakdown: {
            "here": 45,
            "there": 35,
            "over there": 10,
            "with friends": 3
        }
    };

    var     goalOverview = goalJSON.overview,
            goalCity = Object.keys(goalOverview)[0],
            goalNeighborhood = Object.keys(goalOverview)[1],
            goalBreakdown = goalJSON.breakdown;


    // Generate overview statistics
    var goalPercentage = goalOverview[goalNeighborhood] / goalOverview[goalCity];
    var goalRadiusCity = RADIUS - 20;
    var goalRadiusNeighborhood = goalRadiusCity * Math.sqrt(goalPercentage);
    var goalCircleRadii = [goalRadiusCity, goalRadiusNeighborhood];


    // Generate breakdown statistics
    var     goalBreakdownArray = [],
            goalLegendData = [],
            other,                  // data only lists top 4, catch others
            total = 0;              // total of breakdown stats <= 100

    for (var key in goalBreakdown) {
        if (goalBreakdown.hasOwnProperty(key)) {
            total += goalBreakdown[key];
            goalBreakdownArray.push(goalBreakdown[key]);
            goalLegendData.push(key + " " + goalBreakdown[key] + "%");
        }
    }

    other = 100 - total;
    goalBreakdownArray.push(other);
    goalLegendData.push("other " + other + "%");


    // Choose colors from palette
    var goalPalette = [ORANGE_LT, ORANGE_DK];
    var goalColor = d3.scale.ordinal()
            .range(goalPalette);


    // Create overview graph
    var goalSVG = d3.select(".infoGFX--goal").append("svg")
            .attr("class", "goalSVG")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("g")
            .attr("transform", "translate(" + (goalRadiusCity + MARGIN) + "," + HEIGHT / 2 + ")");

    var goalCircles = goalSVG.selectAll("circle")
            .data(goalCircleRadii)
        .enter().append("circle")
            .attr("cx", 0)
            .attr("cy", function(d, i) {return goalRadiusCity - d})
            .attr("fill", function(d, i) {return goalColor(i);})
            .attr("stroke", function(d, i) {return goalColor(i);})
            .attr("r", 0)
            .transition()
            .duration(500)
            .delay(function(d, i) {return i*250;})
            .attr("r", function(d) {return d;});

    goalSVG.append("text")
            .attr("class", "citySVG")
            .attr("y", - goalRadiusCity * 2/3)
            .attr("dy", ".3em")
            .text(goalCity);

    goalSVG.append("text")
            .attr("class", "percentageSVG")
            .attr("y", goalRadiusCity / 2)
            .attr("dy", "0.4em")
            .text(Math.floor(goalPercentage * 100) + "%");


    // Create blowup lines
    var goalLines = d3.select("svg").append("g")
            .attr("transform", "translate(" + (goalRadiusCity + MARGIN) + "," + HEIGHT / 2 + ")");

    goalLines.append("line")
            .transition()
            .duration(250)
            .delay(2250)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 2 * goalRadiusCity + SPACING)
            .attr("y2", -goalRadiusCity)
            .style("stroke", "#ffbb33");

    goalLines.append("line")
            .transition()
            .duration(250)
            .delay(2250)
            .attr("x1", 0)
            .attr("y1", 2 * goalRadiusNeighborhood)
            .attr("x2", 2 * goalRadiusCity + SPACING)
            .attr("y2", 2 * goalRadiusNeighborhood)
            .style("stroke", "#ffbb33");


    // Create breakdown graph
    var goalArc = d3.svg.arc()
            .outerRadius(goalRadiusCity)
            .innerRadius(0);

    var goalPie = d3.layout.pie()
            .sort(null)
            .value(function(d) {return d;});

    var goalPieChart = d3.select("svg").append("g")
            .attr("transform", "translate(" + (3 * goalRadiusCity + MARGIN + 10) +
                    "," + HEIGHT / 2 + ")")
        .selectAll("goalArc")
            .data(goalPie(goalBreakdownArray));

    goalPieChart.enter().append("g")
            .attr("class", "goalArc")
            .append("path")
            .style("fill", "#ffbb33")
            .style("stroke", "#ffffff")
            .style("stroke-width", 2)
            .transition()
            .duration(500)
            .delay(function(d, i) {return i * 250 + 1000})
            .attr("d", goalArc);

    goalPieChart.append("text")
            .transition()
            .delay(2250)
            .attr("class", "regionSVG")
            //.style("stroke", "#ffffff")
            .style("fill", "#ffffff")
            .attr("y", goalRadiusCity - 2*SPACING)
            .attr("x", -goalRadiusCity)
            .text("completed");
    // Create breakdown legend
    /*
    var goalLegend = d3.select(".infoGFX--goal").append("div")
            .attr("class", "legend");

    goalLegend.selectAll("div")
            .data(goalLegendData)
        .enter().append("div")
            .attr("class", "legendItem")
            .transition()
            .duration(500)
            .delay(function(d, i) {return i * 250 + 1000})
            .text(function(d) {return d});*/
}
