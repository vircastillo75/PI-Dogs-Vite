import React, { useEffect, useState } from "react";
import "./Create.module.css"; 
import validation from "../Validation/Validation";
import { createDog } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Create() {
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const [dogsData, setDogsData] = useState({
    id: 0,
    name: "",
    image: "",
    height1: "",
    height2: "",
    weight1: "",
    weight2: "",
    life_span: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    height1: "",
    height2: "",
    weight1: "",
    weight2: "",
    life_span: "",
    temperament: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDogsData({
      ...dogsData,
      [name]: value,
    });
  };

  useEffect(() => {
    const errorsValidation = validation(dogsData);
    setErrors(errorsValidation);
  }, [dogsData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalData = {
      ...dogsData,
      id: Math.floor(Math.random() * 1000) + 300,
      height: `${dogsData.height1} - ${dogsData.height2}`,
      weight: `${dogsData.weight1} - ${dogsData.weight2}`,
      life_span: `${dogsData.life_span} years`,
    };

    dispatch(createDog(finalData));
    alert("Su perro se ha creado correctamente");
    navigate("/home");
    resetForm();
  };

  const resetForm = () => {
    setDogsData({
      name: "",
      image: "",
      height1: "",
      height2: "",
      weight1: "",
      weight2: "",
      life_span: "",
      temperament: [],
    });
  };

  const handleTemps = (event) => {
    const select = event.target.value;

    if (!dogsData.temperament.includes(select)) {
      setDogsData((prevDogsData) => ({
        ...prevDogsData,
        temperament: [...prevDogsData.temperament, select],
      }));
    }
  };

  const handleRemoveTemp = (tempToRemove) => {
    const updatedSelectedTemp = dogsData.temperament.filter(
      (temp) => temp !== tempToRemove
    );
    setDogsData({ ...dogsData, temperament: updatedSelectedTemp });
  };

  return (
    <div>
      <form className="Custom_Form__Create" onSubmit={handleSubmit}>
        {/* Resto del formulario */}
      </form>
    </div>
  );
}
