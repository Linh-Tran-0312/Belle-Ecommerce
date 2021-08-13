import React from 'react';
import '../App.css';
import { Map, GoogleApiWrapper,  Marker } from 'google-maps-react';
 

const MapGoogle= ({ google }) => {
    return(   <div className="mapContainer"> 
            <Map
                google={google}
                zoom={14}
                style={{
                    width: '100%',
                    height: '70vh',
                    position: 'relative !important'
                  }}
                initialCenter={{lat: 10.763325332764133 ,lng: 106.6821082655628248}}
                >
                     <Marker position={{ lat: 10.763325332764133 ,lng: 106.6821082655628248}} />
                </Map>
                </div>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })(MapGoogle)