import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{}}>
      <h1>Only authorized users can have acces to this website</h1>
      <h2>
        Contact Garage owner to get roles,for full experience on the website
      </h2>
      <p>
        Already a user ?<Link to={"/login"}>Login here</Link>
      </p>
      <p>
        New User? <Link to={"/register"}>register for an account here</Link>
      </p>
    </div>
  );
};

export default Home;
