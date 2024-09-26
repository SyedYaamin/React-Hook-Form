import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'

const Layout = () => {
    return (
        <>
            <div className='bg-gray-300 min-h-[100vh]'>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout