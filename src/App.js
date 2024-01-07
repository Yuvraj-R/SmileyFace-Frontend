import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./css/App.css";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import { useState } from "react";
import Cookie from "js-cookie";
import { useEffect } from "react";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  const handleSignOut = async (event) => {
    setIsSignedIn(false);
    Cookie.set("authenticationToken", "");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookie.get("authenticationToken");

      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/user/auth", {
            method: "POST",
            body: JSON.stringify({
              token: token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            setIsSignedIn(true);
          } else {
            setIsSignedIn(false);
          }
        } catch (error) {
          setIsSignedIn(false);
        }
      } else {
        setIsSignedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isSignedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isSignedIn={isSignedIn} onSignOut={handleSignOut} />
        <div className="pages">
          <Routes>
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/sign-in"
              element={<SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}
            />
            <Route path="/account/home" element={<Home isSignedIn={isSignedIn} />} />

            {/* Set a default route to redirect to /account/home */}
            <Route path="/" element={<Navigate to="/account/home" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
