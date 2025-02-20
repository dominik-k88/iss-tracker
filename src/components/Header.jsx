import { TfiSettings } from "react-icons/tfi";
import { useEffect, useState, useRef } from "react";
import Modal from "./Modal";

const Header = () => {
  const [isModalOn, setIsModalOn] = useState(false)
  const modalRef = useRef(null)

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
        <h1>ISS Tracker</h1>
        <TfiSettings onClick={() => setIsModalOn(!isModalOn)} className="settings"/>
           {isModalOn && <div ref={modalRef}>
            <Modal />
            </div>}
    </div>
  </>
    
  )
}

export default Header