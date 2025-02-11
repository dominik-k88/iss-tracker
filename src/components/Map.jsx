import { useEffect, useState } from 'react';
import { MapContainer, TileLayer,Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

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
  const getInfo =  async () => {
  try {  const response =  await fetch(url)
    const data = await response.json()
    const {longitude, latitude} = data.iss_position
    setLongiLati([parseFloat(longitude),parseFloat(latitude)])
  } catch (err) {
    console.log("Error fetch data: ", err)
  } 
}
  
  useEffect( () => {
    getInfo(url)
    const intervalId = setInterval(() => {
      getInfo(url)
    },1000)
    
    return () => {
      clearInterval(intervalId)
    }
  }, [])
  return (<>
        <MapContainer center={[49.19522, 16.60796]} zoom={8} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={longiLati}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {/* <RecenterMap position={longiLati}/> */}
        </MapContainer>
  </>    
  )
}

export default Map