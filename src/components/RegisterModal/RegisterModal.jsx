import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState } from "react";

function RegisterModal({ isOpen, onClose, onSubmit, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);

  // Validation logic
  const isValidEmail =
    email.includes("@") && email.includes(".") && email.length > 5;
  const isValidPassword = password.length >= 6;
  const isValidUsername = username.length >= 2;
  const isFormValid = isValidEmail && isValidPassword && isValidUsername;

  // Error messages
  const emailError =
    emailTouched && !isValidEmail ? "Invalid email address" : "";
  const passwordError =
    passwordTouched && !isValidPassword
      ? "Password must be at least 6 characters"
      : "";
  const usernameError =
    usernameTouched && !isValidUsername
      ? "Username must be at least 2 characters"
      : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (onSubmit) {
      onSubmit(email, password, username);
    }
  };

  const handleSwitchToLogin = (e) => {
    e.preventDefault();
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  const alternativeAction = (
    <p className="modal__alternative-text">
      or{" "}
      <a href="#" className="modal__link" onClick={handleSwitchToLogin}>
        Sign in
      </a>
    </p>
  );

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      alternativeAction={alternativeAction}
      name="register"
      isValid={isFormValid}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
      </label>
      <input
        type="email"
        id="register-email"
        className="modal__input"
        placeholder="Enter email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setEmailTouched(true)}
      />
      <span className="modal__error">{emailError}</span>
      <label htmlFor="register-password" className="modal__label">
        Password
      </label>
      <input
        type="password"
        id="register-password"
        className="modal__input"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setPasswordTouched(true)}
      />
      <span className="modal__error">{passwordError}</span>
      <label htmlFor="register-username" className="modal__label">
        Username
      </label>
      <input
        type="text"
        id="register-username"
        className="modal__input"
        placeholder="Enter username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => setUsernameTouched(true)}
      />
      <span className="modal__error">{usernameError}</span>
      <span className="modal__server-error">This email is not available</span>
    </ModalWithForm>
  );
}

export default RegisterModal;
