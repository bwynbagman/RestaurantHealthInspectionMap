function handleResponse(restaurants) {
    var latLng = new google.maps.LatLng(37.230452, -80.416237);

    var mapOptions = {
        zoom: 12,
        center: latLng
    }

    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow({});

    for (var restaurantName in restaurants) {
        var restaurant = restaurants[restaurantName];        

        if (restaurant.coordinates !== undefined && restaurant.score !== undefined) {
            var splitTitle = restaurant.name.split(" ");
            for (var wordCnt = 0; wordCnt < splitTitle.length; wordCnt++) {
                splitTitle[wordCnt] = splitTitle[wordCnt].charAt(0).toUpperCase() + splitTitle[wordCnt].slice(1).toLowerCase();
            }
            var formattedTitle = splitTitle.join().replace(/,/g, " ");
            var content = "<p>Location: " + formattedTitle + "</p>" + "<p>Score: " + restaurant.score.toFixed(0) + "</p>";
            var markerLatLng = new google.maps.LatLng(restaurant.coordinates.latitude, restaurant.coordinates.longitude);
            var marker = new google.maps.Marker({
                position: markerLatLng,
                map: map,
                title: formattedTitle,
                content: content
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(this.content);
                infowindow.open(map, this);
            });
        }
    }
}

var script = document.createElement("script");
script.src = "http://api.openhealthinspection.com/vendors?city=Blacksburg&callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
