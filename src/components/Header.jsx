import { TfiSettings } from "react-icons/tfi";
import { useState, useContext} from "react";
import Modal from "./Modal";
const Header = () => {
  const [isModalOn, setIsModalOn] = useState(false)
  return (<>
    
    <div className="header">
        <h1>ISS Tracker</h1>
        <TfiSettings onClick={() => setIsModalOn(!isModalOn)} className="settings"/>
        { isModalOn && <Modal />}
    </div>
  </>
    
  )
}

export default Header