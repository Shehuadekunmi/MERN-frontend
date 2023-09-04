import logo from './logo.svg';
import './App.css';
import Hearder from './component/Hearder';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {setDataProduct} from './redux/productslide'

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])

  return (
    <>
         <Toaster />
    <div >
      <Hearder/>
      <main className='pt-20 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
    </>
  );
}

export default App;
