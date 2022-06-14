import React from 'react';
import {compose, withProps} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  
} from "react-google-maps";
import PropTypes from "prop-types";



export const IdxGoogle_maps = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>{
  return (
    <GoogleMap defaultZoom={props.defaultZoom} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      <Marker position={{ lat:props.lat , lng: props.lng  }} />
    </GoogleMap>
  )
});

IdxGoogle_maps.defaultProps ={
  lat:-6.21462,
  lng:106.84513,
  defaultZoom:13
}

IdxGoogle_maps.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  defaultZoom: PropTypes.number
}