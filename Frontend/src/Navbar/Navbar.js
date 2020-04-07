import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  let links = null;
  if (!props.isAuthenticated) {
    links = (
      <React.Fragment>
        <li className="nav-item">
          <Link to="/Register">
            <a className="nav-link register" id="reg">
              Register
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Login">
            <a className="nav-link" id="log">
              Login
            </a>
          </Link>
        </li>
      </React.Fragment>
    );
  } else if (props.isAuthenticated) {
    links = (
      <React.Fragment>
        <li className="nav-item">
          <Link to="/Logout">
            <a className="nav-link" id="log">
              Logout
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Result">
            <a className="nav-link" id="log">
              Result
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="log">
            Welcome {props.username}
          </a>
        </li>
      </React.Fragment>
    );
  }
  return (
    <div className="header">
      <div className="navigationclass row">
        <ul className="navbar-nav" id="navg">
          {links}
          <li className="nav-item">
            <Link to="/Home">
              <a className="nav-link active" id="hom">
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <a className=" brand">Electronic</a>
          </li>
          <li className="nav-item">
            <a className="colorb">Ballot</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
