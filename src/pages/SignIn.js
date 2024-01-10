import Cookie from "js-cookie";
import CredentialInput from "../components/CredentialInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../css/SignIn.css";

export default function SignIn({ isSignedIn, setIsSignedIn, setEmailCallback }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorStyles, setErrorStyles] = useState({
    margin: "0",
    color: "#d40303",
    textAlign: "left",
  });

  const onEmailChange = (newEmail) => {
    setEmail(newEmail);
    setEmailCallback(newEmail);
  };

  const onPasswordChange = (newPassword) => {
    setPassword(newPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/user/sign-in", {
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
      const data = await response.json();
      console.log(data);
      Cookie.set("authenticationToken", data.token);
      Cookie.set("email", email);
      setIsSignedIn(true);
      navigate("/account/home");
    } else {
      setError("Your email address and/or password is incorrect");
      setErrorStyles({
        color: "#d40303",
        textAlign: "left",
        marginBottom: "5%",
        marginTop: "0",
      });
    }
  };

  return isSignedIn === false ? (
    <div className="form-wrapper">
      <div className="form-header-wrapper">
        <h2 className="form-header">Sign In</h2>
      </div>
      <form className="form-body" onSubmit={handleSubmit}>
        <h5 className="form-error" style={errorStyles}>
          {error}
        </h5>
        <CredentialInput label="Email" required={true} onChange={onEmailChange} />
        <CredentialInput label="Password" required={true} onChange={onPasswordChange} />
        <div className="signin-links">
          <a className="signin-links-forgot" href="/reset-password">
            {/*Forgot your Password?*/}
          </a>
        </div>
        <div className="form-submit">
          <button type="submit" style={{ cursor: "pointer" }}>
            Sign In
          </button>
        </div>
        <div className="form-redirect">
          <a className="form-redirect-button" href="/create-account">
            Create an account.
          </a>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/account/home" replace />
  );
}
