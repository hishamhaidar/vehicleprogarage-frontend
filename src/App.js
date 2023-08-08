import "./App.css";
import Header from "./components/Header";
import SideNavMenu from "./components/SideNavMenu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useEffect, useContext } from "react";
import { Route, Routes, useHistory, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import AuthContext from "./context/AuthProvider";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const signOut = () => {
    setAuth({});
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <div className="App">
      <Header />
      <div className="App-Body">
        <SideNavMenu isLoggedIn={isLoggedIn} signOut={signOut} />
        <main className="App-Content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route
                path="login"
                element={
                  <Login
                    setIsLoggedIn={setIsLoggedIn}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                  />
                }
              />
              <Route path="register" element={<Signup />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              {/* AUTHORIZED ROUTES HERE */}
              <Route element={<RequireAuth signOut={signOut} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/*404 sites */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
