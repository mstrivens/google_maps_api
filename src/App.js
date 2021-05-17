import './App.css';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import Tabs from './components/Tabs';
require('dotenv/config')

const mapStyles = {
  width: '60%',
  height: '60%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  })

  onClose = props => {
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      <Tabs>
        <div label="cats-list">
          List of cats
        </div>
        <div label="cats-map">
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={
              {
                lat: 51.52542,
                lng: -0.07055
              }
            }
          >
          <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
          >
            <Marker
              onClick={this.onMarkerClick}
              name={'Cat'}
            />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
            >
              <div>
                <h4> {this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </CurrentLocation>
          </Map>
        </div>
      </Tabs>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCmCWzBckFdaNiS2aTm8PnbVqUyIFVChrY'
})(MapContainer)
