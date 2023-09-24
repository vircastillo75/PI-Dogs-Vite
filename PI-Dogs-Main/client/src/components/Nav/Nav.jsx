import styles from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { NavLink, useLocation } from "react-router-dom";

const Nav = () => {

    const location = useLocation();

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>HenryDogs</h1>
            <div className={styles.body}>
                <div className={styles.searchBar}>
                    <SearchBar/>
                </div>
                <div className={styles.buttons}>
					{/* <button className={styles.btn}>
						<NavLink to="/about" style={{color:"beige", textDecoration:"none"}}>About</NavLink>
					</button> */}
                    {/* Renderizado condicional de los botones */}
					{location.pathname !=="/home" && <NavLink to="/home" style={{color:"beige", textDecoration:"none"}}>
						<button className={styles.btn}>Home</button>
					</NavLink>}
                    {location.pathname !=="/form" && <NavLink to="/form" style={{color:"beige", textDecoration:"none"}}>
						<button className={styles.btn}>New Dog</button>
					</NavLink>}
                    {location.pathname !=="/about" && <NavLink to="/about" style={{color:"beige", textDecoration:"none"}}>
						<button className={styles.btn}>About me</button>
					</NavLink>}
				</div>
            </div>
        </div>
    )
}

export default Nav;