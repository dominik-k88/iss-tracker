import { useEffect, useState, useContext, useRef } from 'react';
import { MapContainer, TileLayer,Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { AppContext } from '../AppContext';
import L from "leaflet";

// const url = "http://api.open-notify.org/iss-now.json"
const url = "https://api.wheretheiss.at/v1/satellites/25544"

const customMarker = new L.Icon({
  iconUrl: "/images/marker-icon.png", 
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41], 
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const RecenterMap = ({position}) => {
  const map = useMap()

  useEffect( () => {    
      map.setView(position)  
  }, [position])
  
  return null  
}

const Map = () => {

  const [longiLati, setLongiLati] = useState([0,0])   
  const {isCenteringOn, languages, findCurrentLanguage} = useContext(AppContext)
  const currentLanguage = findCurrentLanguage(languages)
  const timeoutRef = useRef(null)

  
  
  useEffect( () => {
    
    const getInfo =  async () => {
      try {  
        const response =  await fetch(url)
        if(!response.ok) throw new Error(`HTTP Error: ${response.status}`)
  
        const data = await response.json()      
        const {longitude, latitude} = data
        if(!isNaN(longitude) && !isNaN(latitude)) {
          setLongiLati([parseFloat(latitude),parseFloat(longitude)]) 
        }else {
          console.error("Invalid longi/lati values: ", data)
        }      
         
      } catch (err) {
      console.log("Error fetch data: ", err)
      } 
    }
    getInfo()
    const intervalId = setInterval(getInfo, 2000)
    return () => clearInterval(intervalId)      
    
  }, [])
  return (<div className='main-map-container'>
        <MapContainer center={longiLati} 
          zoom={8} 
          scrollWheelZoom={true} 
          minZoom={2.5}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={longiLati} icon={customMarker}>
            <Popup>
              {currentLanguage ? currentLanguage.popup : "ISS"}
            </Popup>
          </Marker>
          { isCenteringOn && <RecenterMap position={longiLati}/>}
        </MapContainer>
        <div className="info-container">
          <table className='info-table'>
            <thead>
              <tr className='info-head'>
                <th><h2>{currentLanguage ? currentLanguage["table-title"] : "Coords"}</h2></th>
              </tr>
            </thead>
            <tbody>
              <tr className='info-row'>
                <th>{currentLanguage ? currentLanguage.lati : "Latitude"}:</th>
                <td>{longiLati[0]}</td>
              </tr>
              <tr className='info-row'>
                <th>{currentLanguage ? currentLanguage.longi: "Longitude"}:</th>
                <td>{longiLati[1]}</td>
              </tr>
            </tbody>
          </table>
        </div>
  </div>    
  )
}

export default Map