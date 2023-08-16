import "./App.css";
import Header from "./components/Header";
import SideNavMenu from "./components/SideNavMenu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import AuthContext from "./context/AuthProvider";
import BookingRequests from "./components/BookingRequests";
import ModifyRoles from "./components/ModifyRoles";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [currentUserID, setCurrentUserID] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("");
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const signOut = () => {
    setAuth({});
    localStorage.removeItem("authToken");
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
                    setUserName={setUserName}
                    setCurrentUserID={setCurrentUserID}
                    setCurrentUserRole={setCurrentUserRole}
                  />
                }
              />
              <Route path="register" element={<Signup />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              {/* AUTHORIZED ROUTES HERE */}
              <Route element={<RequireAuth signOut={signOut} />}>
                <Route
                  path="dashboard"
                  element={
                    <Dashboard
                      currentUserID={currentUserID}
                      currentUserRole={currentUserRole}
                    />
                  }
                />
                {currentUserRole !== "NEW_USER" ? (
                  <Route path="bookings" element={<BookingRequests />} />
                ) : (
                  <Route path="bookings" element={<Unauthorized />} />
                )}
                {currentUserRole === "GARAGE_OWNER" ? (
                  <Route path="roles" element={<ModifyRoles />} />
                ) : (
                  <Route path="roles" element={<Unauthorized />} />
                )}
                <Route
                  path="profile"
                  element={
                    <Profile
                      username={userName}
                      role={currentUserRole}
                      userID={currentUserID}
                    />
                  }
                />
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
