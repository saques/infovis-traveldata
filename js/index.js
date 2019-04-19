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

const refWidth = 256;
const eachRefHeight = 32;
const fontSize = 16;

const legalDates = [... new Set(consumptions.map(x => x.date))];
const categories = [... new Set(consumptions.map(x => x.sector))];
const palette = d3.scale.category20().domain(categories);

var svg = d3.select("#color-ref").append("svg").attr("width", refWidth).attr("height", eachRefHeight*categories.length);

const expenses = consumptions.map(x => x.amount);
const scale = d3.scale.log().base(10).domain([Math.min(...expenses), Math.max(...expenses)]).range([0, 500]);


svg.selectAll("rect")
    .data(categories)
    .enter().append("rect")
    .attr("width", d => refWidth)
    .attr("height", d => eachRefHeight)
    .attr("y", (d, i) => i * eachRefHeight )
    .attr("fill" , (d) => palette(d));

svg.selectAll("text")
    .data(categories)
    .enter().append("text")
    .attr("font-size", fontSize + "px")
    .attr("y", (d, i) => i * eachRefHeight + fontSize*1.4 )
    .attr("x", (d, i) => 10 )
    .style("fill" , "white")
    .text(function(d) { return d; });


var timeoutIDs = [];

function stopAll(){
    timeoutIDs.forEach(x => clearInterval(x));
    timeoutIDs = [];
    layerGroup.clearLayers();
    map.setView([center.lat, center.long], center.zoom);
}

function placeMarkers(d){

    stopAll();

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


var currDate = 0;

function setDateText(){
    $("#date").html(legalDates[currDate]);
}


 function buttonRewindPress(){
    stopAll(); 
    if(currDate > 0){
         currDate = 0;
         setDateText();
         placeMarkers(legalDates[currDate]);
     }
 }

 function buttonBackPress(){
    stopAll();
    if(currDate > 0){
        currDate--;
        setDateText();
        placeMarkers(legalDates[currDate]);
    }
}

function buttonPlayPress(){
    placeMarkers(legalDates[currDate]);
}

function buttonStopPress(){
    stopAll();
}

function buttonForwardPress(){
    stopAll();
    if(currDate < legalDates.length){
        currDate++;
        setDateText();
        placeMarkers(legalDates[currDate]);
    }
}

function buttonFastforwardPress(){
    stopAll();
    if(currDate < legalDates.length){
        currDate = legalDates.length-1;
        setDateText();
        placeMarkers(legalDates[currDate]);
    }
}

$(function() {
    setDateText();
});