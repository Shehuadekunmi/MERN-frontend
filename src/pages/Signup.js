import React, { useState } from 'react'
import sign from '../images/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom';
import { Imagetobase64 } from '../utility/Imagetobase64';
import toast from 'react-hot-toast';


const Signup = () => {
    const redirect = useNavigate();

    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: '',
        image :''
    })
    const handleconfirm = () => {
        setConfirm(preve => !preve)
    }
    const handleShow = () => {
        setShow(preve => !preve)
    };
    console.log(data);
    const handleonChange = (e) => {

        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUpload = async (e)=>{
        console.log(e.target.files[0]);

        const data = await Imagetobase64(e.target.files[0]);
        console.log(data);

        setData((preve) =>{
            return{
                ...preve,
                image: data
            }
        })
    }

    console.log(process.env.REACT_APP_SERVER_DOMIN);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmpassword } = data;
        if (firstName && lastName && email && password && confirmpassword) {
            if (password === confirmpassword) {

                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
                    method : 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                const dataRes = await fetchData.json();
                console.log(dataRes);

                // alert('dataRes.msg');
                toast(dataRes.msg)
                if(dataRes.msg){                    
                redirect('/login')
                }

            }
            } else {
            alert('password and confirmpassword not equal')
        }
        // else{
        //     alert('Please Enter required  Fields')
        // }

    }
    return (
        <div className='p-3 md:p-4'>

            <div className='w-full max-w-sm  bg-white m-auto flex flex-col items-center p-4'>
                <h1 className='text-center text-2xl font-bold'>Sign UP</h1>
                <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative '>
                    <img src={data.image ? data.image : sign} className='w-full h-full ' />
                    <label>
                    <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                        <p className='text-sm p-1 text-white'>Upload</p>
                    </div>
                    <input type={'file'} accept='image/' className='hidden' onChange={handleUpload}/>
                    </label>
                </div>

                <div>
                    <form className='w-full py-3' onSubmit={handleSubmit}>
                        <label className=''>First Name</label>
                        <input type={'text'} name='firstName' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1
                     rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleonChange} />

                        <label>Last Name</label>
                        <input type={'text'} name='lastName' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1
                     rounded focus-within:outline-blue-300' value={data.lastName} onChange={handleonChange} />

                        <label>Email</label>
                        <input type={'email'} name='email' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1  
                     rounded focus-within:outline-blue-300' value={data.email} onChange={handleonChange} />

                        <label>Password</label>
                        <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300' >
                            <input type={show ? 'text' : 'password'} name='password' className='w-full
                      bg-slate-200 border-none outline-none ' value={data.password} onChange={handleonChange} />
                            <span className='flex text-xl cursor-pointer' onClick={handleShow}>{show ? <BiShow /> : <BiHide />}</span>
                        </div>

                        <label>Confirm Password</label>
                        <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300' >
                            <input type={confirm ? 'text' : 'password'} name='confirmpassword' className='w-full 
                     bg-slate-200 border-none outline-none ' value={data.confirmpassword} onChange={handleonChange} />
                            <span className='flex text-xl cursor-pointer' onClick={handleconfirm}>{confirm ? <BiShow /> : <BiHide />}</span>
                        </div>

                        <button className='maw-w-[120px] w-full text-white py-1 rounded-full mt-4 bg-red-500 hover:bg-blue-600 cursor-pointer m-auto'>Sign Up</button>
                    </form>

                    <p className='text-sm my-2'>Already have account ? <Link to={'/login'} className='text-red-500 underline'> Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup