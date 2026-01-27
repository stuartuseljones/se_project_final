import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useState } from "react";

function LoginModal({ isOpen, onClose, onSubmit, onSwitchToRegister }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  const handleSwitchToRegister = (e) => {
    e.preventDefault();
    if (onSwitchToRegister) {
      onSwitchToRegister();
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation logic
  const isValidEmail =
    email.includes("@") && email.includes(".") && email.length > 5;
  const isValidPassword = password.length >= 6;
  const isFormValid = isValidEmail && isValidPassword;

  const alternativeAction = (
    <p className="modal__alternative-text">
      or{" "}
      <a href="#" className="modal__link" onClick={handleSwitchToRegister}>
        Sign up
      </a>
    </p>
  );

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={alternativeAction}
      name="login"
      isValid={isFormValid}
    >
      <label htmlFor="email" className="modal__label">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="modal__input"
        placeholder="Enter email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="modal__input"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default LoginModal;
