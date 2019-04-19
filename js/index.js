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

var consumptions = [
    {
        "date": "17/12/2018",
        "lat": 40.660492,
        "long": -73.830005,
        "detail": "Air Train",
        "sector": "TRANSPORT",
        "amount": 5,
        "payment_method": "CASH",
        "day_order": 0
    },
    {
      "date": "17/12/2018",
      "lat": 40.660492,
      "long": -73.830005,
      "detail": "7 Day Metro Card",
      "sector": "TRANSPORT",
      "amount": 32,
      "payment_method": "CASH",
      "day_order": 0
    },
    {
      "date": "17/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 1
    },
    {
      "date": "17/12/2018",
      "lat": 40.741579,
      "long": -73.988097,
      "detail": "Shake Shack",
      "sector": "FOOD",
      "amount": 11.09,
      "payment_method": "CASH",
      "day_order": 2
    },
    {
      "date": "17/12/2018",
      "lat": 40.737293,
      "long": -73.990109,
      "detail": "Chipotle",
      "sector": "FOOD",
      "amount": 14.65,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "17/12/2018",
      "lat": 40.737293,
      "long": -73.990109,
      "detail": "Chipotle",
      "sector": "THEFT",
      "amount": 10,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "18/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "18/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Tip",
      "sector": "TIP",
      "amount": 2,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "18/12/2018",
      "lat": 40.764256,
      "long": -73.981049,
      "detail": "Premier Deli",
      "sector": "FOOD",
      "amount": 16,
      "payment_method": "CASH",
      "day_order": 2
    },
    {
      "date": "18/12/2018",
      "lat": 40.752193,
      "long": -73.977644,
      "detail": "Grand Central Pizza",
      "sector": "FOOD",
      "amount": 10.5,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "18/12/2018",
      "lat": 40.744234,
      "long": -73.991973,
      "detail": "CVS",
      "sector": "OTHERS",
      "amount": 7.38,
      "payment_method": "CASH",
      "day_order": 4
    },
    {
      "date": "18/12/2018",
      "lat": 40.757102,
      "long": -73.978223,
      "detail": "H&M",
      "sector": "CLOTHING",
      "amount": 42.96,
      "payment_method": "CARD",
      "day_order": 5
    },
    {
      "date": "18/12/2018",
      "lat": 40.757102,
      "long": -73.978223,
      "detail": "H&M",
      "sector": "CLOTHING",
      "amount": 5,
      "payment_method": "CASH",
      "day_order": 5
    },
    {
      "date": "18/12/2018",
      "lat": 40.741645,
      "long": -73.99004,
      "detail": "7 Eleven",
      "sector": "OTHERS",
      "amount": 3.18,
      "payment_method": "CASH",
      "day_order": 6
    },
    {
      "date": "18/12/2018",
      "lat": 40.7428,
      "long": -73.992583,
      "detail": "BEST BUY",
      "sector": "GADGETS",
      "amount": 500,
      "payment_method": "CARD",
      "day_order": 7
    },
    {
      "date": "19/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "19/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Tip",
      "sector": "TIP",
      "amount": 1,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "19/12/2018",
      "lat": 40.711589,
      "long": -74.013264,
      "detail": "ONE WTC",
      "sector": "SIGHTSEEING",
      "amount": 35,
      "payment_method": "CASH",
      "day_order": 2
    },
    {
      "date": "19/12/2018",
      "lat": 40.711589,
      "long": -74.013264,
      "detail": "ONE WTC GIFTSHOP",
      "sector": "GIFTS",
      "amount": 41.37,
      "payment_method": "CARD",
      "day_order": 2
    },
    {
      "date": "19/12/2018",
      "lat": 40.710637,
      "long": -74.009118,
      "detail": "Shake Shack",
      "sector": "FOOD",
      "amount": 15.1,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "19/12/2018",
      "lat": 40.750188,
      "long": -73.994882,
      "detail": "PANDA EXPRESS",
      "sector": "FOOD",
      "amount": 12,
      "payment_method": "CASH",
      "day_order": 4
    },
    {
      "date": "19/12/2018",
      "lat": 40.750589,
      "long": -73.989602,
      "detail": "MACYS",
      "sector": "CLOTHING",
      "amount": 207.22,
      "payment_method": "CARD",
      "day_order": 5
    },
    {
      "date": "19/12/2018",
      "lat": 40.7428,
      "long": -73.992583,
      "detail": "BEST BUY",
      "sector": "GADGETS",
      "amount": 39.72,
      "payment_method": "CASH",
      "day_order": 6
    },
    {
      "date": "20/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "20/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Tip",
      "sector": "TIP",
      "amount": 1,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "20/12/2018",
      "lat": 40.780725,
      "long": -73.972913,
      "detail": "AMNH",
      "sector": "MUSEUM",
      "amount": 18,
      "payment_method": "CASH",
      "day_order": 2
    },
    {
      "date": "20/12/2018",
      "lat": 40.780725,
      "long": -73.972913,
      "detail": "AMNH GIFT",
      "sector": "GIFTS",
      "amount": 13.05,
      "payment_method": "CARD",
      "day_order": 2
    },
    {
      "date": "20/12/2018",
      "lat": 40.7808,
      "long": -73.976329,
      "detail": "Shake Shack",
      "sector": "FOOD",
      "amount": 14.77,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "20/12/2018",
      "lat": 40.711589,
      "long": -74.013264,
      "detail": "9/11 Memorial",
      "sector": "MUSEUM",
      "amount": 26,
      "payment_method": "CARD",
      "day_order": 4
    },
    {
      "date": "20/12/2018",
      "lat": 40.764256,
      "long": -73.981049,
      "detail": "Premier Deli",
      "sector": "FOOD",
      "amount": 12,
      "payment_method": "CASH",
      "day_order": 5
    },
    {
      "date": "20/12/2018",
      "lat": 40.750589,
      "long": -73.989602,
      "detail": "MACYS",
      "sector": "CLOTHING",
      "amount": 79.85,
      "payment_method": "CARD",
      "day_order": 6
    },
    {
      "date": "20/12/2018",
      "lat": 40.750006,
      "long": -73.988292,
      "detail": "H&M",
      "sector": "CLOTHING",
      "amount": 93.95,
      "payment_method": "CARD",
      "day_order": 7
    },
    {
      "date": "21/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "21/12/2018",
      "lat": 40.749994,
      "long": -73.968631,
      "detail": "UN Tour",
      "sector": "MUSEUM",
      "amount": 15,
      "payment_method": "CARD",
      "day_order": 1
    },
    {
      "date": "21/12/2018",
      "lat": 40.749994,
      "long": -73.968631,
      "detail": "UN Soda",
      "sector": "FOOD",
      "amount": 1.75,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "21/12/2018",
      "lat": 40.752193,
      "long": -73.977644,
      "detail": "Grand Central Pizza",
      "sector": "FOOD",
      "amount": 6,
      "payment_method": "CASH",
      "day_order": 2
    },
    {
      "date": "21/12/2018",
      "lat": 40.741663,
      "long": -73.989901,
      "detail": "Duane Reade",
      "sector": "OTHERS",
      "amount": 2.75,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "21/12/2018",
      "lat": 40.745797,
      "long": -73.987958,
      "detail": "Holy Cow",
      "sector": "FOOD",
      "amount": 14.7,
      "payment_method": "CASH",
      "day_order": 4
    },
    {
      "date": "21/12/2018",
      "lat": 40.7428,
      "long": -73.992583,
      "detail": "BEST BUY",
      "sector": "GADGETS",
      "amount": 22.42,
      "payment_method": "CASH",
      "day_order": 5
    },
    {
      "date": "22/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "22/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Tip",
      "sector": "TIP",
      "amount": 1,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "22/12/2018",
      "lat": 40.711568,
      "long": -74.003814,
      "detail": "Magnets",
      "sector": "GIFTS",
      "amount": 2,
      "payment_method": "CASH",
      "day_order": 2
    },
    {
      "date": "22/12/2018",
      "lat": 40.723848,
      "long": -73.996966,
      "detail": "Dig Inn",
      "sector": "FOOD",
      "amount": 13,
      "payment_method": "CARD",
      "day_order": 3
    },
    {
      "date": "22/12/2018",
      "lat": 40.723547,
      "long": -73.998326,
      "detail": "Uniqlo",
      "sector": "CLOTHING",
      "amount": 34.8,
      "payment_method": "CARD",
      "day_order": 4
    },
    {
      "date": "22/12/2018",
      "lat": 40.722822,
      "long": -73.997869,
      "detail": "MoMa Design Store",
      "sector": "GIFTS",
      "amount": 28.29,
      "payment_method": "CASH",
      "day_order": 5
    },
    {
      "date": "22/12/2018",
      "lat": 40.756421,
      "long": -73.970277,
      "detail": "PANDA EXPRESS",
      "sector": "FOOD",
      "amount": 12,
      "payment_method": "CASH",
      "day_order": 6
    },
    {
      "date": "23/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "23/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Tip",
      "sector": "TIP",
      "amount": 1,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "23/12/2018",
      "lat": 40.779059,
      "long": -73.962506,
      "detail": "MET",
      "sector": "MUSEUM",
      "amount": 12,
      "payment_method": "CARD",
      "day_order": 2
    },
    {
      "date": "23/12/2018",
      "lat": 40.779175,
      "long": -73.954946,
      "detail": "Shake Shack",
      "sector": "FOOD",
      "amount": 14.46,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "23/12/2018",
      "lat": 40.740929,
      "long": -73.988187,
      "detail": "Dig Inn",
      "sector": "FOOD",
      "amount": 12,
      "payment_method": "CARD",
      "day_order": 4
    },
    {
      "date": "24/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Stay",
      "sector": "HOTEL",
      "amount": 83.23,
      "payment_method": "CARD",
      "day_order": 0
    },
    {
      "date": "24/12/2018",
      "lat": 40.743371,
      "long": -73.989995,
      "detail": "Hotel Tip",
      "sector": "TIP",
      "amount": 1,
      "payment_method": "CASH",
      "day_order": 1
    },
    {
      "date": "24/12/2018",
      "lat": 40.724157,
      "long": -73.997844,
      "detail": "Dean & DeLuca",
      "sector": "FOOD",
      "amount": 10.67,
      "payment_method": "CARD",
      "day_order": 2
    },
    {
      "date": "24/12/2018",
      "lat": 40.719021,
      "long": -74.00222,
      "detail": "OMG",
      "sector": "CLOTHING",
      "amount": 45.67,
      "payment_method": "CASH",
      "day_order": 3
    },
    {
      "date": "24/12/2018",
      "lat": 40.719572,
      "long": -74.001746,
      "detail": "Metro",
      "sector": "TRANSPORT",
      "amount": 2.75,
      "payment_method": "CASH",
      "day_order": 4
    },
    {
      "date": "24/12/2018",
      "lat": 40.755308,
      "long": -73.986708,
      "detail": "The Counter",
      "sector": "FOOD",
      "amount": 30,
      "payment_method": "CASH",
      "day_order": 5
    },
    {
      "date": "25/12/2018",
      "lat": 40.660492,
      "long": -73.830005,
      "detail": "Air Train + Metro Pass",
      "sector": "TRANSPORT",
      "amount": 7.75,
      "payment_method": "CASH",
      "day_order": 1
    }
  ];

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