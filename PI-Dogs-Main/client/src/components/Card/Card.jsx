import styles from "./Card.module.css";
import { removeBreed } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Card = ({id,image,name,minWeight,maxWeight,temperaments}) => {

    const dispatch = useDispatch();

    return(
        <div className={styles.container}>
            <div className={styles.btnContainer}>
                {/*Al apretar el boton se cerrara la carta y lo quitara del estado global breeds*/}
                <button className={styles.btnClose} onClick={()=>dispatch(removeBreed(id))}>
                    <div className={styles.sign}>X</div>
                    <div class={styles.text}>Close</div>
                </button>
            </div>
            <h2 className={styles.nameTitle}>{name}</h2>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt={name} />
            </div>
            <div className={styles.ContainerWeightAndBtnDetail}>
                <div className={styles.weightContainer}>
                    <h3 className={styles.weightTitle}>Weight</h3>
                    <div className={styles.weightData}>
                        <p className={styles.data}>Min: {minWeight}</p> 
                        <p className={styles.data}>Max: {maxWeight}</p>
                    </div>
                </div>
                <div className={styles.containerBtnDetail}>
                    <NavLink to={`/detail/${id}`}>
                        <button className={styles.btnDetail} >
                            <svg style={{color: "black"}} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" color="black" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor"><line y2="12" x2="19" y1="12" x1="5"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </NavLink>
                </div>
            </div>
            
            <div className={styles.temperamentsContainer}>
                {temperaments.map((temperament,index)=>{
                    const temperamento = temperament.name?temperament.name:temperament
                    return(
                        <p className={styles.temperament} key={index}>{temperamento}</p>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Card;