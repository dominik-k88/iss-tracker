import { TfiSettings } from "react-icons/tfi";
import { useEffect, useState, useRef,useContext} from "react";
import Modal from "./Modal";
import { AppContext } from "../App";

const Header = () => {
  const [isModalOn, setIsModalOn] = useState(false)
  const modalRef = useRef(null)
  const {languages, findCurrentLanguage} = useContext(AppContext)
  const currentLanguage = findCurrentLanguage(languages)
  useEffect(() => {
    const closeModal = (e) => {
      
      if(modalRef.current && !modalRef.current.contains(e.target)) {        
        setTimeout(() => setIsModalOn(false), 0);
      }      
    }
    if(isModalOn) {
      document.addEventListener("mousedown", closeModal)
    }

    return () => {
      document.removeEventListener("mousedown", closeModal)
    }
  }, [isModalOn])
  

  return (<>
    
    <div className="header">
    
        <h1>{currentLanguage ? currentLanguage.title : "ISS position"}</h1>
        <TfiSettings onClick={() => setIsModalOn(!isModalOn)} className="settings"/>
           {isModalOn && <div ref={modalRef}>
            <Modal />
            </div>}
    </div>
  </>
    
  )
}

export default Header