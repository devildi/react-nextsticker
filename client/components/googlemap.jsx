import React from 'react'

import {observer, inject} from 'mobx-react'
const { compose, withProps, lifecycle, withStateHandlers} = require("recompose")
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} = require("react-google-maps")

import MarkerMe from './Markers'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJHnZaO6czTIkkftjQNdtNcjL52pMxsIY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.center}
    center={props.center}
  >	
		<Marker 
			position={props.whereAmI}
			icon={new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                                                      new google.maps.Size(22,22),
                                                      new google.maps.Point(0,18),
                                                      new google.maps.Point(11,11))} 
		/>
    {
    	props.points && props.points.length > 0
    	? props.points.map((row, index) =>  (
    		<MarkerMe 
    			position={row.location}
    			isOpen={row.isOpen}
    			key={index}
    			index={(index+1).toString()}
    			name={row.nameOfScene}
    			des={row.des}
    			detail={row.detail}
          pic={row.pic}
    		/>
    	))
    	: null
    }
    {
      props.dinner && props.dinner.length > 0
      ? props.dinner.map((row, index) =>  (
        <MarkerMe 
          position={row.location}
          isOpen={row.isOpen}
          key={index}
          index={(index+1).toString()}
          name={row.nameOfScene}
          des={row.des}
          detail={row.detail}
          pic={row.pic}
        />
      ))
      : null
    }
    {
      props.hotel && props.hotel.length > 0
      ? props.hotel.map((row, index) =>  (
        <MarkerMe 
          position={row.location}
          isOpen={row.isOpen}
          key={index}
          index={(index+1).toString()}
          name={row.nameOfScene}
          des={row.des}
          detail={row.detail}
          pic={row.pic}
        />
      ))
      : null
    }
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

@inject('testMobx') @observer
export default class MyComponent extends React.Component {

  componentDidMount() {
    this.props.testMobx.location()
  }

  render() {
  	let points = this.props.testMobx.toJson().points1
    let dinner = this.props.testMobx.toJson().dinner
    let hotel = this.props.testMobx.toJson().hotel
  	let position = this.props.testMobx.toJson().position
    let center = this.props.testMobx.toJson().center
  	let directions = this.props.testMobx.toJson().directions
    return (
      <MyMapComponent
      	center={center}
        points={points}
        dinner={dinner}
        hotel={hotel}
        whereAmI={position}
        directions={directions}
      />
    )
  }
}