import React, { Component, useEffect, useState } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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

    onInputchange(event) {
        console.log(event)
        this.setState({
          destination: event.target.value
        });
    }

    getDirections = async (destination) => { 
        try{
            const directions = `https://maps.googleapis.com/maps/api/directions/json?origin=` + process.env.REACT_APP_DIRECTION_ORIGIN + `&destination=` + destination + `&key=`+ process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC;
            console.log(destination)
        }catch(err){
            console.log(err);
        }
    };
   
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
   
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
   
    render() {

        const containerStyle = {
            position: 'relative',  
            width: '100%',
            height: '100%'
        }

      return (
        <div className="map-modal-container">
            <div className="map-directions-container">
                <div className="map-direction-div">
                    <label>Destination</label>
                    <input onChange={this.destination} type="text"/>
                    <button onClick={this.getDirections}>Get Directions</button>
                </div>
            </div>
            <Map 
                google={this.props.google}
                containerStyle={containerStyle}
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                center={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                onClick={this.onMapClicked}>

                <Marker
                    position={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                    onClick={this.onMarkerClick}
                    // name={'Current location'} 
                />
    
            {/* <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow> */}
            </Map>
        </div>
      )
    }
  }

  export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC)
  })(MapContainer)