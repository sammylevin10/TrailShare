import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="HeaderContainer">
      <header>
        <h1>
          Trail<span className="Accent">Share</span>
        </h1>
        <nav>
          <a href="/">
            <FontAwesomeIcon icon={faHome} className="NavButton" />
          </a>
          <a href="/select-activity">
            <FontAwesomeIcon icon={faEdit} className="NavButton" />
          </a>
          <a href="/user-profile">
            <FontAwesomeIcon icon={faUser} className="NavButton" />
          </a>
        </nav>
      </header>
    </div>
  );
}

export default Header;
