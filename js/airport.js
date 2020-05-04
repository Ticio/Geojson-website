var map;
//initMap() called when Google Maps API code is loaded - when web page is opened/refreshed 
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });
}

var thelocation;
var titleName;
$(document).ready(function () {
    initMap();
    	
    // Set Google map  to its start state
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });

    // The following uses JQuery library
    $.ajax({
        // The URL of the specific data required
        url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            var markers = []; //Keep an array of Google Maps markers, to be used by the Google Maps clusterer
            $.each(data.features, function (key, val) {
                // Get the lat and lng data for use in the markers
                var coords = val.geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);

                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

                markers[i++] = marker; //Add the marker to array to be used by clusterer

                /****** Info Window Contents *******/
                var contentString = '<div class="span4">'+
                                        '<h6 class="text-info text-center">'+ val.properties.name +'</h6>'+
                                        '<p class="mb-1"><b>Abrev: </b>'+val.properties.abbrev + '</p>'+
                                        '<p class="mb-1"><b>GPS Code: </b>'+val.properties.gps_code + '</p>'+
                                        '<p class="mb-1"><b>IATA Code: </b>'+val.properties.iata_code + '</p>'+
                                        '<p class="mb-1"><b>Link: </b><a href="'+ val.properties.wikipedia +'" target="_blank">wikipedia</a></p>'+
                                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                /****** Info Window With Click *******/
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                /****** Info Window Without Click *******/
                // infowindow.open(map,marker);
            });
            
            // var markerCluster = new MarkerClusterer(map, markers, 
            //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
            // );
        }
    });


});

$("#search2").change(function(event) {
    searchByAirportName();
});

function searchByAirportName(name){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });

    $.ajax({
        // The URL of the specific data required
        url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            
            var locations = ""+$("#search2").chosen().val();

            console.log(locations);

            var markers = []; //Keep an array of Google Maps markers, to be used by the Google Maps clusterer
            
            $.each(data.features, function (key, val) {
                
                // Get the lat and lng data for use in the markers
                $.each(locations.split(','), function(index, location){
                   if(location === val.properties.name){
                        var coords = val.geometry.coordinates;
                        var latLng = new google.maps.LatLng(coords[1], coords[0]);
                        
                        // Now create a new marker on the map
                        var marker = new google.maps.Marker({
                            position: latLng,
                            map: map
                        });
                        
                        markers[i++] = marker; //Add the marker to array to be used by clusterer

                        /****** Info Window Contents *******/
                var contentString = '<div class="span4">'+
                                        '<h6 class="text-info text-center">'+ val.properties.name +'</h6>'+
                                        '<p class="mb-1"><b>Abrev: </b>'+val.properties.abbrev + '</p>'+
                                        '<p class="mb-1"><b>GPS Code: </b>'+val.properties.gps_code + '</p>'+
                                        '<p class="mb-1"><b>IATA Code: </b>'+val.properties.iata_code + '</p>'+
                                        '<p class="mb-1"><b>Link: </b><a href="'+ val.properties.wikipedia +'" target="_blank">wikipedia</a></p>'+
                                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                /****** Info Window With Click *******/
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                /****** Info Window Without Click *******/
                // infowindow.open(map,marker);
                   }
                });
            });
            
            // var markerCluster = new MarkerClusterer(map, markers, 
            //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
            // );
        }
    });
}

function searchByLatitudeLongitude(){
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });

    $.ajax({
        // The URL of the specific data required
        url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },
        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            
            var lat = $("#latitude").val();
            var long = $("#longitude").val();

            var markers = []; //Keep an array of Google Maps markers, to be used by the Google Maps clusterer
            
            $.each(data.features, function (key, val) {
                
                // Get the lat and lng data for use in the markers
                
               if(lat == val.geometry.coordinates[0] && long == val.geometry.coordinates[1]){
                    var coords = val.geometry.coordinates;
                    var latLng = new google.maps.LatLng(coords[1], coords[0]);
                    
                    // Now create a new marker on the map
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                    
                    markers[i++] = marker; //Add the marker to array to be used by clusterer
                    /****** Info Window Contents *******/
                var contentString = '<div class="span4">'+
                                        '<h6 class="text-info text-center">'+ val.properties.name +'</h6>'+
                                        '<p class="mb-1"><b>Abrev: </b>'+val.properties.abbrev + '</p>'+
                                        '<p class="mb-1"><b>GPS Code: </b>'+val.properties.gps_code + '</p>'+
                                        '<p class="mb-1"><b>IATA Code: </b>'+val.properties.iata_code + '</p>'+
                                        '<p class="mb-1"><b>Link: </b><a href="'+ val.properties.wikipedia +'" target="_blank">wikipedia</a></p>'+
                                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                /****** Info Window With Click *******/
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                /****** Info Window Without Click *******/
                // infowindow.open(map,marker);
               }
            });
            
            // var markerCluster = new MarkerClusterer(map, markers, 
            //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
            // );
        }
    });
}



