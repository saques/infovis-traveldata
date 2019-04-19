const center = {lat: 40.728487, long: -73.975166, zoom: 12};
const detailZoom = 14;
const detailSpeed = 1500;


Date.prototype.formatDDMMYY=function(){
    var dd = this.getDate(), mm = this.getMonth()+1, yyyy = this.getFullYear();
    if(dd<10){
      dd = '0' + dd;
    }    
    if(mm<10){
      mm = '0'+ mm;
    }
  return String(dd + "\/" + mm + "\/" + yyyy);
};

function areClose(lat1,lon1,lat2,lon2, radius = 0.01){
    var R = 6371; // Earth's radius in Km
    return (Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
                    Math.cos(lat1)*Math.cos(lat2) *
                    Math.cos(lon2-lon1)) * R) < 0.01;
  }

var map = L.map('mapid').setView([center.lat, center.long], center.zoom);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYXNhcXVlcyIsImEiOiJjanVtd2cwYnAybTF5NDVwZ2F2bnVpcGU1In0.-OiZjzDEFc3jUL8z7CFUCA'
}).addTo(map);

var layerGroup = L.layerGroup().addTo(map);
var positionsGroup = L.layerGroup().addTo(map);

const refWidth = 256;
const eachRefHeight = 32;
const fontSize = 16;

const legalDates = [... new Set(consumptions.map(x => x.date))];
const categories = [... new Set(consumptions.map(x => x.sector))];

const palette = d3.scale.category10().domain(categories);

var svg = d3.select("#color-ref").append("svg").attr("width", refWidth).attr("height", eachRefHeight*categories.length);

const expenses = consumptions.map(x => x.amount);
const scale = d3.scale.log().base(10).domain([Math.min(...expenses), Math.max(...expenses)]).range([0, 500]);

function consumptionsByType(d){

    $("#proportions").html('');

    d3plus.viz()
    .container("#proportions")
    .data(consumptions.filter(x => x.date == d))
    .type("tree_map")
    .id(["sector", "payment_method"])
    .size("amount")
    .color(d => palette(d.sector))
    .legend({"size": 55})
    .font({ "family": "sans-serif" })
    .draw();

}

function positionsByNeighbourhood(d){

    $("#neighbourhood").html('');

    var dPositions = positions.filter(x => x.date == d);
    var neighbourhoods = {};

    dPositions.forEach(x => {
        if(!(x.borough in neighbourhoods))
            neighbourhoods[x.borough] = 0;
        neighbourhoods[x.borough] = neighbourhoods[x.borough] + 1;
    });

    var data = [];

    for(key in neighbourhoods){
        data.push({
            "city": "New York",
            "neighbourhood" : key,
            "count" : neighbourhoods[key]
        });
    }

    d3plus.viz()
    .container("#neighbourhood")
    .data(data)
    .type("bubbles")       
    .id(["city", "neighbourhood"])
    .depth(1)
    .size("count")
    .font({ "family": "sans-serif" })
    .draw();    

}



var timeoutIDs = [];

function stopAndClearCircles(){
    timeoutIDs.forEach(x => clearInterval(x));
    timeoutIDs = [];
    layerGroup.clearLayers();
    map.setView([center.lat, center.long], center.zoom);
}

function placeMarkers(d){

    stopAndClearCircles();

    var currentDate = consumptions.filter(x => x.date == d);

    var pos = timeoutIDs.length - 1;

    var currentIdx = 0;
    timeoutIDs.push(setInterval((data, interval) => {
        if(currentIdx == currentDate.length){
            clearInterval(timeoutIDs[pos]);
            return;
        }

        var element = currentDate[currentIdx++];

        map.setView([element.lat, element.long], detailZoom);
        //map.flyTo([element.lat, element.long], 14);

        var circle = L.circle([element.lat, element.long], {
            color: palette(element.sector),
            fillColor: palette(element.sector),
            fillOpacity: 0.25,
            radius: scale(element.amount)
        }).addTo(layerGroup);

        circle.bindPopup("<b>" + element.detail +  "</b><br/>" + 
                         "<b>" + element.sector +  "</b>&nbsp;&nbsp;$" + element.amount).openPopup();

    }, detailSpeed));
}

function placePositions(d){

    positionsGroup.clearLayers();

    positions.filter(x => x.date == d).forEach(x => {
        L.circle([x.lat, x.long], {
            color: "black",
            fillColor: "black",
            fillOpacity: 0.5,
            radius: 0.5
        }).addTo(positionsGroup)
    });
}


var currDate = 0;

function setDateText(){

    var dateParts = legalDates[currDate].split("/");

    // month is 0-based, that's why we need dataParts[1] - 1
    var date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    $("#date").html(date.toLocaleString('en-us', { weekday: "long", month: "long", day: "numeric", year: "numeric" }));

    placePositions(legalDates[currDate]);
    consumptionsByType(legalDates[currDate]);
    positionsByNeighbourhood(legalDates[currDate]);
}


 function buttonRewindPress(){
    stopAndClearCircles(); 
    if(currDate > 0){
         currDate = 0;
         setDateText();
     }
 }

 function buttonBackPress(){
    stopAndClearCircles();
    if(currDate > 0){
        currDate--;
        setDateText();
    }
}

function buttonPlayPress(){
    placeMarkers(legalDates[currDate]);
}

function buttonStopPress(){
    stopAndClearCircles();
}

function buttonForwardPress(){
    stopAndClearCircles();
    if(currDate < legalDates.length - 1){
        currDate++;
        setDateText();
    }
}

function buttonFastforwardPress(){
    stopAndClearCircles();
    if(currDate < legalDates.length){
        currDate = legalDates.length-1;
        setDateText();
    }
}


function getNeighborhood(lat,  long, date, ans) {

    var url = "https://api.opencagedata.com/geocode/v1/json?q=" + lat + '%2C' + long + "&key=63afacf5799d406f8ec9067407554758"

    $.ajax({
    type: 'GET',
    url: url,
    success: function(rgeo) {
        var result = rgeo.results[0].components.county;

        console.log(result);

        ans.push({
            "lat": lat,
            "long": long,
            "date": date,
            "county": result
        });

    },
    error: function(rgeo) {
        console.log(rgeo);
    }
    });
}



$(function() {
    setDateText();
});