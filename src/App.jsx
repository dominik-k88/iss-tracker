import { useState, useEffect } from "react"
import languages from "./langData"
import Map from "./components/Map"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AppContext } from "./AppContext"

function App() {  
  const [isCenteringOn, setIsCenteringOn] = useState(true)
  const [currentLang, setCurrentLang] = useState("en")
  const findCurrentLanguage = (languages) => {
    return languages.find( lang => lang.label === currentLang)
  }

  useEffect(() => {
    const updatePosition = () => {
      const headerHeight = document.querySelector(".header").offsetHeight       
      document.documentElement.style.setProperty("--header-height", headerHeight + "px")      
    }
    updatePosition()
    // "Need to be added event listener"
  }, [])
  return (
    <>
      <AppContext.Provider value={{isCenteringOn, setIsCenteringOn, languages, currentLang, setCurrentLang, findCurrentLanguage}}>
        <Header />           
        <Map />  
        <Footer />    
      </AppContext.Provider>          
    </>
  )
}

export default App