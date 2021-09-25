import React, { useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export const MapC = (props) => {

    const [start, setStart] = useState(process.env.REACT_APP_DIRECTION_ORIGIN)

    const [end, setEnd] = useState("13011 sw 123 ave miami, fl 33186")

    const containerStyle = {
        position: 'relative',  
        width: '100%',
        height: '100%'
    }

    const onMapReady = (mapProps, map) => {

        let coords = [];
        let waypoints = [];

        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer();

        directionsDisplay.setMap(map);

        // let card = document.getElementById("pac-card");
        let input = document.getElementById("pac-input");
        // map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);
        let autocomplete = new window.google.maps.places.Autocomplete(input);

        autocomplete.bindTo("bounds", map);
    
        autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    
        autocomplete.addListener("place_changed", function (e) {
            let place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
          
            // waypoints.push({
            //     location: {
            //         lat: coords[coords.length - 1].lat,
            //         lng: coords[coords.length - 1].lng,
            //     },
            //     stopover: true,
            // });
        
            // coords.push({
            //      lat: place.geometry.location.lat(),
            //      lng: place.geometry.location.lng(),
            // });

            setEnd(place.geometry.location);
            
            request = {
                origin: start,
                waypoints: waypoints,
                destination: end,
                travelMode: "DRIVING",
            };

            directionsService.route(request, function (result, status) {
                if (status == "OK") {
                    directionsDisplay.setDirections(result);
                }
            });

        });

        setEnd(end);
    
        // for (let i = 1; i < coords.length - 1; i++) {
        //     waypoints.push({
        //         location: { lat: coords[i].lat, lng: coords[i].lng },
        //         stopover: true,
        //     });
        // }

        let request = {
            origin: start,
            waypoints: waypoints,
            destination: end,
            travelMode: "DRIVING",
        };

        directionsService.route(request, function (result, status) {
            if (status == "OK") {
                directionsDisplay.setDirections(result);
            }
        });
    };

    return(
        <div className="main-body">
            <div className="grid map-modal-container">
                <div className="map-directions-container">
                    <div className="pac-card map-direction-div" id="pac-card">
                        <label>Destination</label>
                        <input id="pac-input" type="text" onChange={e => setEnd(e.target.value)}/>
                    </div>
                </div>
                <Map
                initialCenter={process.env.REACT_APP_DIRECTION_ORIGIN}
                google={props.google}
                onClick={props.onMapClicked}
                onReady={onMapReady}
                containerStyle={containerStyle}
                >
                </Map>
            </div>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC)
})(MapC)