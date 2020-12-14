import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div className="HeaderContainer">
      <header>
        <h1>TrailShare</h1>
        <nav>
          <a href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
          <a href="/select-activity">
            <FontAwesomeIcon icon={faEdit} />
          </a>
          <a href="/user-profile">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </nav>
      </header>
    </div>
  );
}

export default Header;
