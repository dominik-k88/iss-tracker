import languages from "../langData"
import { useContext, useEffect } from "react"
import { CenteringContext } from "../App"

const Modal = () => {

  const {isCenteringOn, setIsCenteringOn} = useContext(CenteringContext)
  
  return (
    <div className="modal">
        <div className="moda-content">
            <div className="auto-center">
                <label htmlFor="center">Auto-center</label>
                <input id="center" type="checkbox" 
                  defaultChecked={isCenteringOn} 
                  onChange={() => setIsCenteringOn(!isCenteringOn)}/>
            </div>
            <hr />
            <select className="lang-container" name="" id="">
              {
                languages.map((language, index) => {
                  const {lang} = language                  
                  return <option key={index} value={lang}>{lang.toUpperCase()}</option>
                })
              }              
            </select>
        </div>
    </div>
  )
}

export default Modal