import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    // use Fragmentation when returning more than one component
    <div className="min-h-screen bg-[#0d1117] text-white">
    <Header />
    <Outlet />
    </div>
  )
}

export default Layout