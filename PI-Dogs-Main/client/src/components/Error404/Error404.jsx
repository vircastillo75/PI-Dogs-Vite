import React from 'react'
import { Link } from 'react-router-dom'
import "./Error404.module.css"

export default function Error404() {
  return (
    <div className='Custom_Container__Error404'>
      <h2 className='Custom_H2_404'>ERROR 404</h2>
      <Link to={"/home"}>
        <button className='Custom_Button__404'>Go Home</button>
      </Link>
    </div>
  )
}
