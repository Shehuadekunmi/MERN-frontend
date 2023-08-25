import React, { useState } from 'react'
import logo from '../images/logo1.jpg'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import {BsCartFill} from 'react-icons/bs'


const Hearder = () => {
    const [showMenu, setShowMenu] = useState(false);
    const handleShowMenu = () =>{
        setShowMenu(preve => !preve)
    }
    return (
        <div>
            <header className='fixed shadow-md w-full h-20 px-2 md:px-4 z-50 bg-white'>
                {/* desktop */}

                <div className='flex items-center h-full justify-between'>
                    <Link to={''}>
                        <div className='h-16'>
                            <img src={logo} className='h-full' />
                        </div></Link>

                    <div className=' flex gap-4 md:gap-7 items-center'>

                        <nav className=' flex gap-4 md:gap-6 text-base md:text-lg'>
                            <Link to={''}>Home</Link>
                            <Link to={'about'}>About</Link>
                            <Link to={'menu'}>Menu</Link>
                            <Link to={'contact'}>Contact</Link>
                           
                        </nav>
                            <div className='text-2xl text-slate-600 relative'>
                                <BsCartFill/>
                                <div className='absolute -top-2 -right-1 text-white bg-red-500 w-4  rounded-full  m-0 p-0  h-4 text-sm text-center '>0</div>
                            </div>
                            <div className='text-xl  text-slate-600 '  onClick={handleShowMenu}>
                                
                                <div className='border-2 border-solid border-slate-600 p-1 cursor-pointer rounded-full'>
                                 <FaUserAlt /> 
                                </div>
                                {
                                    showMenu && (
                                        <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col'>
                                        <Link to='newproduct' className='whitespace-nowrap cursor-pointer'>New Products</Link>
                                        <Link to='login' className='whitespace-nowrap cursor-pointer'>Login</Link>
                                    </div>
                                    )}
                        
                            </div>
                    </div>
                </div>




                {/* mobile */}

            </header>
        </div>
    )
}

export default Hearder