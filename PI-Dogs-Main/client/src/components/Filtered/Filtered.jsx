import React, { useEffect } from "react";
import "./Filtered.module.css"; 
import { useDispatch, useSelector } from "react-redux";
import {
  filterAz,
  filterOrigins,
  filterTemperaments,
  filterWeight,
  reset,
} from "../../redux/actions";

export default function Filtered() {
  const temperaments = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const handleAoZ = (event) => {
    dispatch(filterAz(event.target.value));
  };

  const handleOrigin = (event) => {
    dispatch(filterOrigins(event.target.value));
  };

  const handleFilterTemp = (event) => {
    dispatch(filterTemperaments(event.target.value));
  };

  const handleFilterWeight = (event) => {
    dispatch(filterWeight(event.target.value));
  };

  return (
    <div className="Custom_Container__Filtered"> 
      <div className="Custom_Filters__Cont"> 
        <h3>Origins</h3>
        <select
          className="Custom_Container__select" 
          name="Origin"
          onChange={handleOrigin}
          defaultValue="Default" // Cambia "selected" a "defaultValue"
        >
          <option value="Default" disabled>
            (Select Origin)
          </option>
          <option value="">All</option>
          <option value="API">Api</option>
          <option value="DB">Db</option>
        </select>
      </div>

      <div className="Custom_Filters__Cont"> 
        <h3>Alphabetic</h3>
        <select
          className="Custom_Container__select" 
          name="A_Z"
          onChange={handleAoZ}
          defaultValue="Default" // Cambia "selected" a "defaultValue"
        >
          <option value="Default" disabled>
            (Select Order)
          </option>
          <option value="A">A - Z</option>
          <option value="Z">Z - A</option>
        </select>
      </div>

      <div className="Custom_Filters__Cont">
        <h3>Temperaments</h3>
        <select
          className="Custom_Container__select" 
          name="temperaments"
          onChange={handleFilterTemp}
          defaultValue="Default" // Cambia "selected" a "defaultValue"
        >
          <option value="Default" disabled>
            (Select Temperament)
          </option>
          <option value="Alldogs">All Dogs</option>
          {Array.isArray(temperaments) &&
            temperaments?.map((temperament, index) => {
              return (
                <option value={temperament} key={index}>
                  {temperament}
                </option>
              );
            })}
        </select>
      </div>

      <div className="Custom_Filters__Cont"> 
        <h3>Weight</h3>
        <select
          className="Custom_Container__select" 
          name="Weight"
          onChange={handleFilterWeight}
          defaultValue="Default" // Cambia "selected" a "defaultValue"
        >
          <option value="Default" disabled>
            (Select Weight)
          </option>
          <option value="maximum">Maximum</option>
          <option value="minimun">Minimum</option>
        </select>
      </div>

      <button className="Custom_Button__Reset" onClick={() => dispatch(reset())}>
        Reset{" "}
      </button>
    </div>
  );
}
