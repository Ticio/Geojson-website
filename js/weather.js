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
        url: "http://api.apixu.com/v1/current.json?key=58dde5503a504b3899282758191308&q=Paris",

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
    var URL = "https://api.apixu.com/v1/forecast.json?key=58dde5503a504b3899282758191308&q="+""+$("#search2").chosen().val();
    searchByLocation(URL);
});

$("#btn-search").click(function(event) {

    event.preventDefault();

    var lat = parseFloat($("#latitude").val());
    var lng = parseFloat($("#longitude").val());
    var URL = "https://api.apixu.com/v1/forecast.json?key=58dde5503a504b3899282758191308&q="+ lat.toFixed(4) + ',' + lng.toFixed(4);

    searchByLocation(URL);

});

function searchByLocation(URL){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });

    $.ajax({
        // The URL of the specific data required
        url: URL,

        // Called if there is a problem loading the data
        error: function () {
            console.log('<p>An error has occurred</p>');
        },
        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            
            console.log(data);
                var markers = [];
                var latLng = new google.maps.LatLng(data.location.lat, data.location.lon);
                
                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                    
                markers[i++] = marker; //Add the marker to array to be used by clusterer

                /****** Info Window Contents *******/
                var contentString =  '<table class="table table-borderless">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th class="text-center text-info" scope="col" colspan="5">Current Weather</th>'+
                                            '</tr>'+
                                        '</thead>'+
                                        
                                        '<tbody>'+
                                            '<tr>'+
                                              '<th scope="row" class="text-center">'+
                                                '<img src="https:'+ data.current.condition.icon +'" alt="Patchy rain possible" title="Patchy rain possible" class="img-circle" style="width:50px;height:50px;">'+
                                                '<p class="text-center my-1" style="font-size: 12px">'+ data.current.condition.text +'</p>'+
                                                '<p class="text-warning my-2 text-center" style="font-size: 20px">'+ data.current.temp_c +'º C </p>'+
                                              '</th>'+
                                              '<td colspan="4" style="font-size: 13px">'+
                                                '<span  class="my-2 d-block"><b>Wind:  </b>'+ data.current.wind_mph +' mph </span>'+
                                                '<span  class="my-2 d-block"><b>Precip:  </b>'+ data.current.precip_in +' in</span>'+
                                                '<span  class="my-2 d-block"><b>Cloud:  </b>'+  data.current.cloud +'</span>'+
                                                '<span  class="my-2 d-block"><b>Humidity:  </b>'+ data.current.humidity +'</span>'+
                                                '<span  class="my-2 d-block"><b>Pressure:  </b>'+ data.current.pressure_in +' in </span>'+
                                              '</td>'+
                                            '</tr>'+
                                        '</tbody>'+
                                    '</table>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                /****** Info Window With Click *******/
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                /****** Info Window Without Click *******/
                infowindow.open(map,marker);
            }
            
            // var markerCluster = new MarkerClusterer(map, markers, 
            //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
            // );
        });
}

function searchByLatitudeLongitude(){
    
}