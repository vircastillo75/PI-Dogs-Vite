// DetailPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [breed, setBreed] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`);
        const data = response.data;
        if (data.name) {
          setBreed(data);
        } else {
          window.alert('No hay razas con ese ID');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        window.alert('Ocurrió un error al cargar la información');
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>{breed.name}</h1>
        <div className={styles.imageAndDataContainer}>
          <img className={styles.img} src={breed.image} alt={breed.name} />
          <div className={styles.infoContainer}>
            <div className={styles.information}>
              <div className={styles.dataContainer}>
                <h2 className={styles.subtitle}>WEIGHT</h2>
                <div className={styles.dataMinMax}>
                  <div className={styles.data}>
                    <h3>Min</h3>
                    <p className={styles.dataText}>{breed.minWeight}Kg</p>
                  </div>
                  <div className={styles.data}>
                    <h3>Max</h3>
                    <p className={styles.dataText}>{breed.maxWeight}Kg</p>
                  </div>
                </div>
              </div>
              <div className={styles.dataContainer}>
                <h2 className={styles.subtitle}>HEIGHT</h2>
                <div className={styles.dataMinMax}>
                  <div className={styles.data}>
                    <h3>Min</h3>
                    <p className={styles.dataText}>{breed.minHeight}cm</p>
                  </div>
                  <div className={styles.data}>
                    <h3>Max</h3>
                    <p className={styles.dataText}>{breed.maxHeight}cm</p>
                  </div>
                </div>
              </div>
              <div className={styles.dataContainer}>
                <h2 className={styles.subtitle}>LIFE SPAN</h2>
                <div className={styles.data}>
                  <p className={styles.dataText}>{breed.life_span}years</p>
                </div>
              </div>
            </div>
            <div className={styles.temperamentsContainer}>
              <h2 className={styles.subtitle}>TEMPERAMENTS</h2>
              <ul className={styles.temperaments}>
                {breed.Temperaments?.map((temperament, index) => (
                  <li key={`${temperament.id}+${index}`} className={styles.temperament}>
                    {temperament.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
