import { TfiSettings } from "react-icons/tfi";
import Modal from "./Modal";
const Header = () => {
  return (<>
    
    <div className="header">
        <h1>ISS Tracker</h1>
        <TfiSettings className="settings"/>
        <Modal />
    </div>
  </>
    
  )
}

export default Header