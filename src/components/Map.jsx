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
  const {isCenteringOn, languages, findCurrentLanguage} = useContext(AppContext)
  const currentLanguage = findCurrentLanguage(languages)
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
  return (<div className='main-map-container'>
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