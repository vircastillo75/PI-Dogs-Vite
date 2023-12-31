import styles from "./Card.module.css";
import { removeBreed } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Card = ({ id, image, name, minWeight, maxWeight, temperaments }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button className={styles.btnClose} onClick={() => dispatch(removeBreed(id))}>
          <div className={styles.sign}>X</div>
          <div className={styles.text}>Close</div>
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
        </div>

      <div className={styles.temperamentsContainer}>
        {temperaments.map((temperament, index) => {
          const temperamento = temperament.name ? temperament.name : temperament;
          return (
            <p className={styles.temperament} key={index}>
              {temperamento}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
