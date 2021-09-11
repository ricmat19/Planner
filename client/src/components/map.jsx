import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        destination: "",
        mapCenter: {
            lat: 25.674227497365834,
            lng: -80.39446040249253
        }
    };

  onMapReady = (mapProps, map) => {
    // let coords = [];
    let waypoints = [];
    //put data from config file in an array
    // {
    //   places.map((place) => coords.push({ lat: place.lat, lng: place.lng }));
    // }

    //instantiate directions service and directions renderer
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    //put directions renderer to render in the map
    directionsDisplay.setMap(map);
    //Getting the first coordinate in the array as the start/origin
    let start = this.mapCenter;

        //setting the autocomplete input
        let card = document.getElementById("pac-card");
        let input = document.getElementById("pac-input");
        // map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);
        let autocomplete = new window.google.maps.places.Autocomplete(input);
    
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);
    
        // Set the data fields to return when the user selects a place.
        autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    
        //listener for the places input
        autocomplete.addListener("place_changed", function (e) {
        //   console.log(waypoints);
          let place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          
          //Putting the previous last coordinate in the array to be part of the waypoint
        //   waypoints.push({
        //     location: {
        //       lat: coords[coords.length - 1].lat,
        //       lng: coords[coords.length - 1].lng,
        //     },
        //     stopover: true,
        //   });
    
          //putting the Place Autocomplete coordinate result in the coords array
        //   coords.push({
        //     lat: place.geometry.location.lat(),
        //     lng: place.geometry.location.lng(),
        //   });
          //putting the Place Autocomplete coordinate result the value of the end/destination
          end = place.geometry.location;
          
          //changing  request
          request = {
            origin: this.mapCenter,
            waypoints: waypoints,
            destination: end,
            travelMode: "DRIVING",
          };
          //creating new directions request
          directionsService.route(request, function (result, status) {
            if (status == "OK") {
              directionsDisplay.setDirections(result);
            }
          });
        });

        
    //Getting the last coordinate in the array as the end/destination
    let end = this.mapCenter;
    
    //putting all the coordinates between the first and last coordinate from the array as the waypoints
    // for (let i = 1; i < coords.length - 1; i++) {
    //   waypoints.push({
    //     location: { lat: coords[i].lat, lng: coords[i].lng },
    //     stopover: true,
    //   });
    // }

    // directions requests

    let request = {
      origin: this.mapCenter,
      waypoints: waypoints,
      destination: end,
      travelMode: "DRIVING",
    };
    //show results in the directionsrenderer
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsDisplay.setDirections(result);
      }
    });
  };


  render() {
    //if (!this.props.loaded) return <div>Loading...</div>;

    const containerStyle = {
        position: 'relative',  
        width: '100%',
        height: '100%'
    }

    return (
        <div className="map-modal-container">
        <div className="map-directions-container">
            <div className="pac-card map-direction-div" id="pac-card">
                <label>Destination</label>
                <input id="pac-input" type="text"/>
            </div>
        </div>
        <Map
          initialCenter={this.mapCenter}
          google={this.props.google}
          onClick={this.onMapClicked}
          onReady={this.onMapReady}
          containerStyle={containerStyle}
        ></Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC)
  })(MapContainer)