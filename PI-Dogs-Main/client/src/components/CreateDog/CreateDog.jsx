import styles from "./CreateDog.module.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallTemperaments } from "../../redux/actions";
import validate from "../../utils/validations";
import axios from "axios";

const CreateDog = () => {
  const dispatch = useDispatch();
  const { temperaments } = useSelector((state) => state);

  const initialState = {
    name: "",
    image: "",
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    life_span: 0,
    temperaments: [],
  };

  const [breedData, setBreedData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    dispatch(getallTemperaments());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBreedData({
      ...breedData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: validate({ ...breedData, [name]: value })[name],
    });
  };

  const handleChangeTemperaments = (event) => {
    const { name, value, checked } = event.target;
    const newTemperaments = checked
      ? [...breedData.temperaments, value]
      : breedData.temperaments.filter((temperament) => temperament !== value);

    setBreedData({
      ...breedData,
      [name]: newTemperaments,
    });

    setCheckboxes({
      ...checkboxes,
      [value]: checked,
    });

    setErrors({
      ...errors,
      [name]: validate({ ...breedData, [name]: newTemperaments })[name],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const arrayErrors = Object.values(errors);

    if (arrayErrors.every((error) => !error)) {
      axios
        .post("http://localhost:3001/dogs", breedData)
        .then((res) => {
          alert("Breed created");
          resetForm();
        })
        .catch((error) => {
          console.error("Error creating breed:", error);
          alert("An error occurred while creating the breed.");
        });
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  const resetForm = () => {
    setBreedData(initialState);
    setErrors(initialState);
    setCheckboxes({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <h1 className={styles.title}>Create Dog</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
            <label className={styles.labelTitle} htmlFor="name">
              NOMBRE
            </label>
            <input
              className={styles.inputText}
              name="name"
              type="text"
              value={breedData.name}
              placeholder="Ingrese el nombre del perro..."
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.labelTitle} htmlFor="image">
              IMAGE URL
            </label>
            <input
              className={styles.inputText}
              name="image"
              type="text"
              value={breedData.image}
              placeholder="Ingrese la url de la imagen..."
              onChange={handleChange}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.labelTitle} htmlFor="minHeight">
              ALTURA
            </label>
            <div className={styles.containerMinMax}>
              <div className={styles.inputData}>
                <label className={styles.labelText} htmlFor="minHeight">
                  MIN
                </label>
                <input
                  className={styles.inputNumber}
                  name="minHeight"
                  type="number"
                  value={breedData.minHeight}
                  placeholder="Altura min..."
                  onChange={handleChange}
                />
                {errors.minHeight && (
                  <p className={styles.error}>{errors.minHeight}</p>
                )}
              </div>
              <div className={styles.inputData}>
                <label className={styles.labelText} htmlFor="maxHeight">
                  MAX
                </label>
                <input
                  className={styles.inputNumber}
                  name="maxHeight"
                  type="number"
                  value={breedData.maxHeight}
                  placeholder="Altura max..."
                  onChange={handleChange}
                />
                {errors.maxHeight && (
                  <p className={styles.error}>{errors.maxHeight}</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.labelTitle} htmlFor="minWeight">
              PESO
            </label>
            <div className={styles.containerMinMax}>
              <div className={styles.inputData}>
                <label className={styles.labelText} htmlFor="minWeight">
                  MIN
                </label>
                <input
                  className={styles.inputNumber}
                  name="minWeight"
                  type="number"
                  value={breedData.minWeight}
                  placeholder="Peso min..."
                  onChange={handleChange}
                />
                {errors.minWeight && (
                  <p className={styles.error}>{errors.minWeight}</p>
                )}
              </div>
              <div className={styles.inputData}>
                <label className={styles.labelText} htmlFor="maxWeight">
                  MAX
                </label>
                <input
                  className={styles.inputNumber}
                  name="maxWeight"
                  type="number"
                  value={breedData.maxWeight}
                  placeholder="Peso max..."
                  onChange={handleChange}
                />
                {errors.maxWeight && (
                  <p className={styles.error}>{errors.maxWeight}</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.labelTitle} htmlFor="life_span">
              AÑOS DE VIDA
            </label>
            <input
              className={styles.inputNumber}
              name="life_span"
              type="number"
              value={breedData.life_span}
              placeholder="Ingrese la esperanza de vida..."
              onChange={handleChange}
            />
            {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.labelTitle} htmlFor="temperament">
              TEMPERAMENTOS
            </label>
            <br />
            <div className={styles.temperamentsContainer}>
              {temperaments.map((temperament) => (
                <div key={temperament.id} className={styles.temperament}>
                  <label className={styles.containerCheckBox}>
                    <input
                      className={styles.checkBox}
                      name="temperaments"
                      type="checkbox"
                      value={temperament.name}
                      onChange={handleChangeTemperaments}
                      checked={breedData.temperaments.includes(temperament.name)}
                    />
                    <span className={styles.checkmark}></span>
                    {temperament.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.temperaments && (
              <p className={styles.error}>{errors.temperaments}</p>
            )}
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btnSubmit} type="submit">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDog;