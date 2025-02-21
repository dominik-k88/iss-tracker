import { useContext } from "react"
import { AppContext } from "../App"

const Modal = () => {

  const {isCenteringOn, setIsCenteringOn, languages, currentLang, setCurrentLang, findCurrentLanguage} = useContext(AppContext)
  const currentLanguage = findCurrentLanguage(languages)
  return (
    <div className="modal">
        <div className="moda-content">
            <div className="auto-center">
                <label htmlFor="center">{currentLanguage ?
                 currentLanguage.checkBox : "Auto-center"}</label>
                <input id="center" type="checkbox" 
                  defaultChecked={isCenteringOn} 
                  onChange={() => setIsCenteringOn(!isCenteringOn)}/>
            </div>
            <hr />
            <select 
              value={currentLang}
              onChange={(e) => setCurrentLang(() => e.target.value)}               
             className="lang-container" name="" id="">
              {
                languages.map((language, index) => {
                  const {label} = language                              
                  return <option key={index} value={label}>{label.toUpperCase()}</option>
                })
              }              
            </select>
        </div>
    </div>
  )
}

export default Modal