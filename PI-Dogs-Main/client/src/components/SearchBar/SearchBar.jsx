import React from 'react'
import { useState } from 'react'
import "./SearchBar.module.css"
import { useDispatch } from 'react-redux'
import { onSearchName } from "../../redux/actions"

export default function SearchBar() {

  const [name, setName] = useState("")
  
  const dispatch = useDispatch()

  const handleChange = (event)=>{
    setName(event.target.value)
  }

  const search = () =>{
    dispatch(onSearchName(name))
    setName("");
  }
 
  return (
    <div className='Custom_Container__Search'>

        <input className='Custom_Input__Search' value={name} onChange={handleChange} type="search" placeholder='Enter your name' />

      <button className="Custom_button__search" onClick={search}><p>Search</p>
      </button>

    </div>
  )
}
