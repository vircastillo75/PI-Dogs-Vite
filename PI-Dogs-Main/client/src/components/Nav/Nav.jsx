import { NavLink } from "react-router-dom";

//import Search from "../SearchBar/Search";

import "./Nav.module.css";

function Nav() {
    return (
      <div className="Nav">
        <h1>Navegacion</h1>
        
        <NavLink to='/home'>HOME</NavLink>
        <Search></Search>
      </div>
    );
  }
  
  export default Nav;