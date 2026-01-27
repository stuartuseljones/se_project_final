import React from "react";
import "./ModalWithForm.css";
import closeButton from "../../assets/closebutton.svg";

function ModalWithForm({
  children,
  title,
  onClose,
  isOpen,
  onSubmit,
  buttonText = "Submit",
  alternativeAction,
  name,
  isValid = false,
}) {
  return (
    <div
      className={`modal ${name ? `modal_${name}` : ""} ${isOpen ? "modal_opened" : ""}`}
      onClick={onClose} // click on overlay closes modal
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose}>
          <img
            className="modal__close-icon"
            src={closeButton}
            alt="close button"
          />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit} name={name}>
          {children}
          <button
            type="submit"
            className={`modal__submit-button ${isValid ? "modal__submit-button_enabled" : ""}`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
          {alternativeAction && (
            <div className="modal__alternative-action">{alternativeAction}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
