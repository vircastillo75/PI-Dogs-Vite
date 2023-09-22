import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './Home.module.css'; 

import Nav from "../Nav/Nav"; 
import Cards from "../Cards/Cards"; 

function Home() {

  // Selecciona los perros del estado global (almacenados en Redux).
  const dogs = useSelector((state)=> state.dogs);

  // Define estados locales para el nombre de búsqueda y los perros filtrados.
  const [searchName, setSearchName] = useState("");
  const [filters, setFilters] = useState(dogs);

  // Maneja el cambio en el campo de búsqueda.
  const handleChange = (evento) => {
    setSearchName(evento.target.value);
  }

  // Maneja la presentación del formulario de búsqueda.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Filtra los perros cuyo nombre contiene la cadena de búsqueda (ignorando mayúsculas/minúsculas).
    const filtered = dogs.filter((dog) => 
      dog.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilters(filtered); // Actualiza los perros filtrados en el estado local.
  }

  // Si no hay filtros, muestra todos los perros.
  if(!filters){
    setFilters(dogs);
  }

  // Imprime en la consola los perros del estado global.
  console.log(dogs);

  return (
    <div>
       <Nav handleChange={handleChange} handleSubmit={handleSubmit} /> {/* Renderiza el componente de navegación y pasa las funciones de manejo del formulario. */}
      <Cards dogs={filters} /> {/* Renderiza el componente de tarjetas y pasa los perros filtrados. */}
    </div>
  );
}

export default Home;
