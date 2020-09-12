let mapPoint = document.querySelector(".map");

function initMap(){
    let map = new google.maps.Map(mapPoint, {
        // position:,
        zoom: 10
    });

    let pointer = new google.maps.Marker({
        // center:,
        map: map
        //, icon: ""
    });

    let pointerInfo = new google.maps.InfoWindow({
        content: "<div class='point-title'></div><div class='address'></div>"
    });

    pointer.addListener('click', function(){
        pointerInfo.open(map, pointer);
    })
}