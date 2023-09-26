import React, { useState } from "react";
import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navSearchContainer}>
        <div className={styles.nav}>
          <div className={styles.body}>
            <div className={styles.buttons}>
              {location.pathname !== "/home" && (
                <NavLink to="/home" style={{ color: "beige", textDecoration: "none" }}>
                  <button className={styles.btn}>Home</button>
                </NavLink>
              )}
              {location.pathname !== "/form" && (
                <NavLink to="/form" style={{ color: "beige", textDecoration: "none" }}>
                  <button className={styles.btn}>Create Dog</button>
                </NavLink>
              )}
              {location.pathname !== "/about" && (
                <NavLink to="/about" style={{ color: "beige", textDecoration: "none" }}>
                  <button className={styles.btn}>About me</button>
                </NavLink>
              )}
              <button className={styles.btn} onClick={toggleSearchBar}>Search</button>
            </div>
          </div>
        </div>
        {showSearchBar && (
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

