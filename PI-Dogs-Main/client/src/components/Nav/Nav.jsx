import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { LogoLogout } from '../../svg/Logos';
import { MenuHamburguer } from '../../svg/Logos';
import './Nav.module.css';

export default function Nav() { 
  const [menu, setMenu] = useState(false)

  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenu(!menu)
  }

  const handleLinkClick = (path) => {
    setMenu(false)
    navigate(path)
  }

  return (
    <div className='Custom_Container__Nav'> 

      <div className='Custom_Container__Navigate'> 

        <div className={`Custom_Container__Menu ${menu ? 'Custom_isActive' : ''}`} > 
         
          <ul className='Custom_Nav__Cont'> 
           
           
            <li className='Custom_Nav__Li'>
              <Link className='Custom_Nav__Link' to='/home' onClick={() => handleLinkClick('/home')}>
                Home
              </Link>
            </li>
            <li className='Custom_Nav__Li'> 
              <Link className='Custom_Nav__Link' to='/create' onClick={() => handleLinkClick('/create')}>
                Create
              </Link>
            </li>
            <li className='Custom_Nav__Li'> 
              <Link className='Custom_Nav__Link' to='/about' onClick={() => handleLinkClick('/about')}>
                About
              </Link>
            </li>
            <li className='Custom_Nav__Li--Logout'> 
              <Link className='Custom_Nav__Link' to='/' onClick={() => handleLinkClick('/')}>
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <div className='Custom_DivS'> {/* Cambia el nombre de la clase del contenedor */}
          <SearchBar />
          <button className='Custom_Button__Hamburguer' onClick={toggleMenu}><MenuHamburguer /></button> {/* Cambia el nombre de la clase del botón */}
        </div>

      </div>

      <Link className='Custom_Nav__Logout' to='/'>
        <button className='Custom_Button__Logout'> <LogoLogout className='Custom_Logo__Logout' /></button> {/* Cambia el nombre de la clase del botón y el nombre de la clase del logo */}
      </Link>

    </div>
  )
}
