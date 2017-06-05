jQuery(document).ready(function($) {
    function initMap() {
        // Create a new StyledMapType object, passing it an array of styles,
        // and the name to be displayed on the map type control.
        var styledMapType = new google.maps.StyledMapType(
            [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#71737c"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}],
            {name: 'Styled Map'});

        var uluru = {lat: latC, lng: lngC};
        var map = new google.maps.Map(document.getElementById('g-map'), {
            zoom: 16,
            // center: {lat: latC + 0.001, lng: lngC - 0.005},
            center: {lat: latC, lng: lngC},
            disableDefaultUI: true,
            mapTypeControlOptions: {
                mapTypeIds: ['styled_map']
            }
        });

        var image = 'img/marker.png';

        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            icon: image
        });

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
    }

    initMap();
});