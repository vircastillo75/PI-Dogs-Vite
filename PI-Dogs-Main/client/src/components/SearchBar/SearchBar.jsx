import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";

const SearchBar = ({ setShowSearchBar }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSearch = () => {
        dispatch(searchByName(name));
        setShowSearchBar(false); // Cierra la barra de búsqueda después de buscar
    }

    return (
        <div className={styles.container}>
            <input className={styles.input} type='search' placeholder='BREED NAME' onChange={handleChange} value={name} />
            <button className={styles.buttonSearch} onClick={handleSearch}>
                <span className={styles.texto}>SEARCH</span>
            </button>
        </div>
    )
}

export default SearchBar;
