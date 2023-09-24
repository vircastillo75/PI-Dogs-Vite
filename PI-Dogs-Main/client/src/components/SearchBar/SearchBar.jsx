import styles from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch()
    const [name,setName] = useState("");

    const handleChange = (event) => {
        setName(event.target.value)
    }
    return (
        <div className={styles.container}>
            <input className={styles.input} type='search' placeholder='Nombre de la raza' onChange={handleChange} value={name}/>
            <button className={styles.buttonSearch} onClick={()=>dispatch(searchByName(name))}>
                <span className={styles.texto}>SEARCH</span> </button>
        </div>
    )
}

export default SearchBar;