import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Config/Firebase/FirebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setIsUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true);
            }
            else {
                setIsUser(false);
            }
        });
    }, [navigate]);


    // Logout Function
    const handleLogout = async () => {
        signOut(auth).then(() => {
            setIsUser(true);
        }).catch((error) => {
            setIsUser(false);
        });
    }

    return (
        <>
            <div className="navbar w-full bg-indigo-700 flex justify-between px-5">
                <div className='block lg:hidden' onClick={() => setOpen(!open)}>
                    <span className='text-2xl text-white btn btn-ghost border-2 border-white'><FaBars /></span>
                </div>
                <div className=''>
                    <a className="btn btn-ghost text-2xl text-white">Daisy UI</a>
                </div>
                <div className='bg-transparent flex justify-center items-center gap-24'>
                    <div className='hidden lg:block'>
                        <ul className='bg-transparent flex justify-center items-center gap-5 text-white text-xl'>
                            <li className='btn btn-ghost text-xl'><Link to="/">Home</Link></li>
                            <li className={`${user ? "hidden" : "btn btn-ghost text-xl"}`}><Link to="login">Login</Link></li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li >Profile</li>
                            <li className={`${user ? "block" : "hidden"}`} onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`bg-indigo-700 w-full flex justify-center items-center py-2 text-white text-lg min-h-20 ${open ? "block" : "hidden"}`}>
                <ul className='text-center font-medium flex flex-col'>
                    <li className='btn btn-ghost text-lg'><Link to='/'>Home</Link></li>
                    <li className={`${user ? "hidden" : "btn btn-ghost text-xl"}`}><Link to='login'>Login</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar