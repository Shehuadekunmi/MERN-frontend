import { useState } from 'react'
import sign from '../images/login-animation.gif'
import { BiShow, BiHide } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {loginRedux} from '../redux/userslice'

const Login = () => {
    const navigate = useNavigate
  const [show, setShow] = useState(false);
  
  const [data, setData] = useState({
      email: '',
      password: '',
  })

  const userData = useSelector(state => state)
  console.log(userData.user);

  const dispatch = useDispatch()
 
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

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {  email, password } = data;
      if ( email && password ) {
        
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
            method : 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataRes = await fetchData.json();
        console.log(dataRes);
        toast( dataRes.msg)

        if(dataRes.alert){
            dispatch(loginRedux(dataRes))
           setTimeout(()=>{
            navigate('/')
           }, 1000)

        //    console.log(userData);

        }
          
          } else {
          alert('Please Enter required  Fields')
      }
      // else{
      //     alert('Please Enter required  Fields')
      // }

  }
  return (
    <div className='p-3 md:p-4'>

            <div className='w-full max-w-sm  bg-white m-auto flex flex-col items-center p-4'>
                <h1 className='text-center text-2xl font-bold'>Sign UP</h1>
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md'>
                    <img src={sign} className='w-full ' />
                </div>

                <div>
                    <form className='w-full py-3' onSubmit={handleSubmit}>
                     
                        <label>Email</label>
                        <input type={'email'} name='email' className='w-full mt-1 mb-2 bg-slate-200 px-2 py-1  
                     rounded focus-within:outline-blue-300' value={data.email} onChange={handleonChange} />

                        <label>Password</label>
                        <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300' >
                            <input type={show ? 'text' : 'password'} name='password' className='w-full
                      bg-slate-200 border-none outline-none ' value={data.password} onChange={handleonChange} />
                            <span className='flex text-xl cursor-pointer' onClick={handleShow}>{show ? <BiShow /> : <BiHide />}</span>
                        </div>

                       
                        <button className='maw-w-[120px] w-full text-white py-1 rounded-full mt-4 bg-red-500 hover:bg-blue-600 cursor-pointer m-auto'>Log in</button>
                    </form>

                    <p className='text-sm my-2'>Don't have account ? <Link to={'/signup'} className='text-red-500 underline'> Sign UP</Link></p>
                </div>
            </div>
        </div>
  )
}

export default Login