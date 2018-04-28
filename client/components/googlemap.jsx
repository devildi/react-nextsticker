import React from 'react'
import {observer, inject} from 'mobx-react'
const { compose, withProps, lifecycle, withStateHandlers} = require("recompose")
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps")

const FaAnchor = require("react-icons/lib/fa/anchor")

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJHnZaO6czTIkkftjQNdtNcjL52pMxsIY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.center}
    center={props.whereAmI}
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
    	? props.points.map((row, index) => (
    		<Marker 
    			defaultAnimation={google.maps.Animation.DROP}
    			position={row} 
    			key={index}
    			label={(index+1).toString()}
    			onClick={props.onToggleOpen}
    		>
    			{
    				props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}></InfoWindow>
     			}	
    		</Marker>
    		))
    	: null
    }
  </GoogleMap>
)


@inject('testMobx') @observer
export default class MyComponent extends React.Component {

  locationMyself(){
  	navigator.geolocation.getCurrentPosition((position) => {
    	const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.props.testMobx.location(pos)
    }, ()=> {console.log('定位失败！')})
  }

  componentDidMount() {
    this.locationMyself()
  }

  render() {
  	let points = this.props.testMobx.toJson().points
  	let position = this.props.testMobx.toJson().position
  	console.log(position)
    return (
      <MyMapComponent
      	center={position}
        points={points}
        whereAmI={position}
      />
    )
  }
}