import styles from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = ({breeds}) => {

    return(
        <div className={styles.container}>
            {
                breeds?.map(breed => {
                    return(
                        <Card
                        key={breed.id}
                        id={breed.id}
                        image={breed.image}
                        name={breed.name}
                        minWeight={breed.minWeight}
                        maxWeight={breed.maxWeight}
                        temperaments={breed.Temperaments}
                        />
                    )
                })
            }
        </div>
    )
}

export default Cards;