import { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer,Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { AppContext } from '../App';

const url = "http://api.open-notify.org/iss-now.json"

const RecenterMap = ({position}) => {
  const map = useMap()

  useEffect( () => {    
      map.setView(position)  
  }, [position])
  
  return null  
}

const Map = () => {

  const [longiLati, setLongiLati] = useState([0,0])   
  const {isCenteringOn} = useContext(AppContext)

  const getInfo =  async () => {
    try {  const response =  await fetch(url)
    const data = await response.json()
    const {longitude, latitude} = data.iss_position
    setLongiLati([parseFloat(latitude),parseFloat(longitude)])    
  } catch (err) {
    console.log("Error fetch data: ", err)
  } 
}
  
  useEffect( () => {
    getInfo()
    const intervalId = setInterval(() => {
      getInfo()
    },1000)
    
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (<>
        <MapContainer center={longiLati} 
          zoom={8} 
          scrollWheelZoom={true} 
          minZoom={2.5}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={longiLati}>
            <Popup>
              International space station
            </Popup>
          </Marker>
          { isCenteringOn && <RecenterMap position={longiLati}/>}
        </MapContainer>
  </>    
  )
}

export default Map