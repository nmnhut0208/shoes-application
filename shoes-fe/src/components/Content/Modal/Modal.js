import './Modal.css'


const Modal = ({ title, open, onCancel, children }) => {
    if (!open) { return null }
    return (
        <div className="modal" >
            <div className="modal__overlay"></div>
            <div className="model__body">
                <div className="header_modal">
                    <label className="title_modal">{title}</label>
                    <button className="button_close_modal"
                        onClick={onCancel}>X</button>
                </div>
                <div className="content_modal">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal