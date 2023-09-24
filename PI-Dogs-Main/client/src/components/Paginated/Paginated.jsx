import React from "react";
import { prev, next } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { NextRight, NextLeft } from "../../svg/Logos";
import "./Paginated.module.css";

export default function Paginated({ pageNumber, cantPage }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="container__paginated">
        {pageNumber <= 1 ? (
          <>
            <button onClick={() => dispatch(prev())} disabled>
              <NextLeft className="Custom_Logo__Pag" /> 
            </button>
          </>
        ) : (
          <>
            <button onClick={() => dispatch(prev())}>
              <NextLeft className="Custom_Logo__Pag" />
            </button>
            <p>{pageNumber - 1}</p>
          </>
        )}
        <h3>{pageNumber}</h3>
        {pageNumber > cantPage ? (
          <>
            <button onClick={() => dispatch(next())} disabled>
              <NextRight className="Custom_Logo__Pag" />
            </button>
          </>
        ) : (
          <>
            <p>{pageNumber + 1}</p>
            <button onClick={() => dispatch(next())}>
              <NextRight className="Custom_Logo__Pag" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
