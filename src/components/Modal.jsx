
const Modal = () => {
  return (
    <div className="modal">
        <div className="moda-content">
            <div className="auto-center">
                <label htmlFor="center">Auto-center</label>
                <input id="center" type="checkbox" />
            </div>
            <select className="lang-container" name="" id="">
                <option value="en">EN</option>
                <option value="cz">CZ</option>
            </select>
        </div>
    </div>
  )
}

export default Modal