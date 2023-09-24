import styles from "./HomePage.module.css";
import Cards from "../Cards/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getallTemperaments, getallBreeds, filterByTemperaments, filterByOrigin, alphabeticalOrder, orderByWeight } from "../../redux/actions";
import Paginado from "../Paginado/Paginado";

const HomePage = () => {

    const dispatch = useDispatch();
    //obtengo las razas del estado global
    const {breeds, temperaments} = useSelector(state => state);
    //variables para el paginado
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ breedsPerPage, setBreedsPerPage ] = useState(8);
    const indexLastBreed = currentPage * breedsPerPage;
    const indexFirstBreed = indexLastBreed - breedsPerPage;
    const currentBreeds = breeds.slice(indexFirstBreed,indexLastBreed);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //Al renderizarse este componente me guarda todos los temperamentos y razas en el estado global
    useEffect(()=>{
        dispatch(getallBreeds());
        dispatch(getallTemperaments());
    },[])

    const handleOrderByWeight = (event) => {
        dispatch(orderByWeight(event.target.value))
    }

    const handleOrderAlphabetical = (event) => {
        dispatch(alphabeticalOrder(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterByTemperaments(event.target.value))
    }
    const handleOrderByOrigin = (event) => {
        dispatch(filterByOrigin(event.target.value))
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.selectsContainer}>
                <select className={styles.select} onChange={handleOrderAlphabetical}>
                    <option className={styles.option} value="">Alphabetical Order</option>
                    <option className={styles.option} value="AA">Up</option>
                    <option className={styles.option} value="AD">Down</option>
                    
                </select>
                <select className={styles.select} onChange={handleOrderByWeight}>
                    <option value="" >Weight</option>
                    <option className={styles.option} value="PMINA">Weight Min. Up</option>
                    <option className={styles.option} value="PMIND">Weight Min. Down</option>
                    <option className={styles.option} value="PMAXA">Weight Max. Up</option>
                    <option className={styles.option} value="PMAXD">Weight Max. Down</option>
                </select>
                <select className={styles.select} onChange={handleFilter}>
                    <option className={styles.option} value="">Temperaments</option>
                    {temperaments.map(temperament=>{
                        return(
                            <option className={styles.option} key={temperament.id} value={temperament.name}>{temperament.name}</option>
                        )
                    })}
                </select>
                <select className={styles.select} onChange={handleOrderByOrigin}>
                    <option className={styles.option} value="">Origin</option>
                    <option className={styles.option} value="api">API</option>
                    <option className={styles.option} value="bdd">BDD</option>
                    <option className={styles.option} value="all">ALL</option>
                </select>
            </div>
            <Paginado
            breedsPerPage={breedsPerPage}
            allbreeds={breeds.length}
            paginado={paginado}
            /> 
            <Cards
            breeds = {currentBreeds}
            />        
        </div>
    )
}

export default HomePage;