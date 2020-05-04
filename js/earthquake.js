//For disabling and enabling the checkboxes
$("input:checkbox").on('click', function() {
  var $box = $(this);

  if ($box.is(":checked")) {
      
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);

  } else {
      $box.prop("checked", false);
  }
});

// //For enabling 
// $(".chosen-select").chosen();


//Script to the earthquake mapping
// $.get('https://api.worldbank.org/v2/countries/'+country+'/indicators/IT.NET.USER.ZS?format=json&date=2010:2018', function(data) {
    
// }).done(function(data){
//     // drawGraph($("#int-u canvas"), data, "bar", "Individuals using the internet", "rgba(75,192,192, 0.4)");
// });


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

    $("input:checkbox").on('click', function (){
    	
        // Set Google map  to its start state
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
            mapTypeId: 'terrain' // can be any valid type
        });

        // The following uses JQuery library
        $.ajax({
            // The URL of the specific data required
            url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/"+$('input[name="check"]:checked').val()+".geojson",

            // Called if there is a problem loading the data
            error: function () {
                $('#info').html('<p>An error has occurred</p>');
            },
            // Called when the data has succesfully loaded
            success: function (data) {
                i = 0;
                var markers = []; // keep an array of Google Maps markers, to be used by the Google Maps clusterer
                $.each(data.features, function (key, val) {
                    // Get the lat and lng data for use in the markers
                    var coords = val.geometry.coordinates;
                    var latLng = new google.maps.LatLng(coords[1], coords[0]);
                    // Now create a new marker on the map
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                    markers[i++] = marker; // Add the marker to array to be used by clusterer
                });
                
                var markerCluster = new MarkerClusterer(map, markers, 
                    { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
                );
            }
        });
    });
});


