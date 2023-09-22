import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallTemperaments } from "../../redux/actions";
import validate from "../../utils/validations";
import axios from "axios";
import styles from "./FormPage.module.css";

const FormPage = () => {
  const dispatch = useDispatch();
  const { temperaments } = useSelector((state) => state);

  // Estado para los datos del formulario y los errores
  const { 
    name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments: selectedTemperaments 
  } = breedData;

  const {
    name: nameError, image: imageError, minHeight: minHeightError, maxHeight: maxHeightError, 
    minWeight: minWeightError, maxWeight: maxWeightError, life_span: lifeSpanError, temperaments: temperamentsError
  } = errors;

  // Cargar los temperamentos cuando se monta el componente
  useEffect(() => {
    dispatch(getallTemperaments());
  }, []);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (event) => {
    setBreedData({
      ...breedData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...breedData,
        [event.target.name]: event.target.value,
      })
    );
  };

  // Función para agregar/quitar temperamentos seleccionados
  const handleAddTemperament = (event) => {
    const temperament = event.target.value;
    const updatedTemperaments = selectedTemperaments.includes(temperament)
      ? selectedTemperaments.filter((temp) => temp !== temperament)
      : [...selectedTemperaments, temperament];

    setBreedData({ ...breedData, temperaments: updatedTemperaments });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    const arrayErrors = Object.values(errors);

    if (arrayErrors.every((error) => !error)) {
      // Enviar los datos al servidor para crear una nueva raza
      axios.post("/dogs", breedData)
        .then((res) => {
          alert("Breed created");
          resetForm();
        })
        .catch((error) => {
          alert("Error creating breed. Please try again later.");
        });
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  // Función para restablecer el formulario después de enviarlo con éxito
  const resetForm = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    setBreedData({
      name: "",
      image: "",
      minHeight: 0,
      maxHeight: 0,
      minWeight: 0,
      maxWeight: 0,
      life_span: 0,
      temperaments: [],
    });
    setErrors({
      name: "",
      image: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      life_span: "",
      temperaments: [],
    });
  };

  // Renderizado del formulario
  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <h1 className={styles.title}>Create Dog</h1>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          {/* ... */}
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

export default FormPage;
