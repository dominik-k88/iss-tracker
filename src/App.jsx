import { useState, createContext, useEffect } from "react"
import Map from "./components/Map"
import Header from "./components/Header"
import Footer from "./components/Footer"
export const CenteringContext = createContext()

function App() {  
  const [isCenteringOn, setIsCenteringOn] = useState(true)
  
  useEffect(() => {
    const updatePosition = () => {
      const headerHeight = document.querySelector(".header").offsetHeight      

      document.documentElement.style.setProperty("--header-height", headerHeight + "px")      
    }
    updatePosition()
    
  }, [])
  return (
    <>
      <CenteringContext.Provider value={{isCenteringOn, setIsCenteringOn}}>
        <Header />           
        <Map />     
      </CenteringContext.Provider> 
      <Footer />    
    </>
  )
}

export default App