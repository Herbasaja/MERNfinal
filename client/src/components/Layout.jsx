import classes from './Layout.module.scss'
import React from 'react'
import Header from './Header'

function Layout({children}) {
  return (
    <>
    <Header />
    <main className={classes.container}>{children}</main>
    </>
  )
}

export default Layout