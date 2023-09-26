import React, { useState } from "react";
import styles from "./Nav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

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
              {location.pathname !== "/create-dog" && (
                <NavLink to="/create-dog" style={{ color: "beige", textDecoration: "none" }}>
                  <button className={styles.btn}>Create Dog</button>
                </NavLink>
              )}
              {location.pathname !== "/about" && (
                <NavLink to="/about" style={{ color: "beige", textDecoration: "none" }}>
                  <button className={styles.btn}>About me</button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
        {location.pathname === "/home" && (
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
