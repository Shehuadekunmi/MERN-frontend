import logo from './logo.svg';
import './App.css';
import Hearder from './component/Hearder';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div >
      <Hearder/>
      <main className='pt-20 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
