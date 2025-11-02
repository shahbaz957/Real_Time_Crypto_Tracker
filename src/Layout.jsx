import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    // use Fragmentation when returning more than one component
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default Layout