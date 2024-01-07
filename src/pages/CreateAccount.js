import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CredentialInput from "../components/CredentialInput";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailErrorStyles, setEmailErrorStyles] = useState({
    margin: "0",
  });
  const [passwordErrorStyles, setPasswordErrorStyles] = useState({
    margin: "0",
  });
  const [ovrErrorStyles, setOvrErrorStyles] = useState({
    margin: "0",
  });

  const [ovrError, setOvrError] = useState("");

  const yesErrorStyles = {
    color: "#d40303",
    textAlign: "left",
    marginBottom: "5%",
    marginTop: "0",
  };

  const onEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const onConfirmEmailChange = (newConfirmEmail) => {
    setConfirmEmail(newConfirmEmail);
  };

  const onPasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  const onConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
  };

  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
    if (email !== confirmEmail) {
      setEmailError("Emails do not match");
      setEmailErrorStyles(yesErrorStyles);
      valid = false;
    } else {
      setEmailError("");
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setPasswordErrorStyles(yesErrorStyles);
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setOvrError("");
        showToast("User successfully created");
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        const data = await response.json();
        setOvrError(data.error);
        setOvrErrorStyles(yesErrorStyles);
      }
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-header-wrapper">
        <h2 className="form-header">Sign Up</h2>
      </div>
      <form className="form-body" onSubmit={handleSubmit}>
        <ToastContainer />
        <h5 style={ovrErrorStyles}>{ovrError}</h5>
        <h5 style={emailErrorStyles}>{emailError}</h5>
        <CredentialInput label="Email" required={true} onChange={onEmailChange} />
        <CredentialInput label="Confirm Email" required={true} onChange={onConfirmEmailChange} />
        <h5 style={passwordErrorStyles}>{passwordError}</h5>
        <CredentialInput label="Password" required={true} onChange={onPasswordChange} />
        <CredentialInput label="Confirm Password" required={true} onChange={onConfirmPasswordChange} />
        <div className="form-submit">
          <button type="submit">Sign Up</button>
        </div>
        <div className="form-redirect">
          <p>Already have an account?</p>
          <a className="form-redirect-button" href="/sign-in">
            Sign In
          </a>
        </div>
      </form>
    </div>
  );
}
