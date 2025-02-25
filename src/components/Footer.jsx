import { FaFacebookF, FaGithub  } from "react-icons/fa6";
import { useContext } from "react";
import { AppContext } from "../App";
const Footer = () => {
  const {languages, findCurrentLanguage} = useContext(AppContext)
  const currentLanguage = findCurrentLanguage(languages)
  return (
    <>
    <div className="footer">
      <div className="links">
      <a className="fb" href="https://www.facebook.com/profile.php?id=100011298286827"><FaFacebookF /></a>
      <a href="https://github.com/dominik-k88"><FaGithub /></a>
      </div>
      <div className="made-by">&copy; 2025 {currentLanguage ? currentLanguage.made: "Created by"} <span>Dominikk</span></div>
    </div>
    </>    
  )
}

export default Footer