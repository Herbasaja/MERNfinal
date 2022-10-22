import React from 'react'
import logo from '../assets/logo.png'
import classes from './Header.module.scss'

function Header() {
  return (
    <div className={classes.header}>
        <img src={logo} alt="Logo" />
        <div className={classes.pagetitle}>Dūzgės</div>
    </div>
  )
}

export default Header