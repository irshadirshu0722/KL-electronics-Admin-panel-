import React from 'react'
import './navbar.css'
import logo from "./logo.jpg"
import {useNavigate} from 'react-router-dom'
export const NavBar = ()=> {
  const navigate =useNavigate()
  return (
    <div className='header'>
        <div className='container'>
            <div className='row'>
                <div className='image-div' onClick={()=>navigate('/')}>
                    <img src={logo} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
