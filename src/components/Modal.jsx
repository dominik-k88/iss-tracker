import { useContext } from "react"
import { AppContext } from "../AppContext"

const Modal = () => {

  const {isCenteringOn, setIsCenteringOn, languages, currentLang, findCurrentLanguage, persistLanguage} = useContext(AppContext)
  const currentLanguage = findCurrentLanguage(languages)
  return (
    <div className="modal">
        <div className="moda-content">
            <div className="auto-center">
                <label htmlFor="center">{currentLanguage ?
                 currentLanguage.checkBox : "Auto-center"}</label>
                <input id="center" type="checkbox" 
                  checked={isCenteringOn}                   
                 onChange={() => setIsCenteringOn(!isCenteringOn)}/>
            </div>
            <hr />
            <select 
              value={currentLang}
              onChange={(e) => persistLanguage(e)}                       
              className="lang-container">
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