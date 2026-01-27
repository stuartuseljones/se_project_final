import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SuccessModal.css";

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  const handleSignInClick = (e) => {
    e.preventDefault();
    if (onSignInClick) {
      onSignInClick();
    }
  };

  const alternativeAction = (
    <a href="#" className="modal__link" onClick={handleSignInClick}>
      Sign in
    </a>
  );

  return (
    <ModalWithForm
      title="Registration successfully completed!"
      buttonText=""
      isOpen={isOpen}
      onClose={onClose}
      alternativeAction={alternativeAction}
      name="success"
    ></ModalWithForm>
  );
}

export default SuccessModal;
