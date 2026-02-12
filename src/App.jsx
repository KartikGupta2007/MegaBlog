import React from 'react'
import { useDispatch } from 'react-redux';
import {login, logout} from './store/AuthFile';
import authService from './AppWrite/Auth';
import './App.css'
import {Header} from './components';
import {Footer} from './components';

function App() {
  const[loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData) dispatch(login({userData})); 
      else dispatch(logout());
    })
    .catch(()=>{dispatch(logout())})
    .finally(()=>setLoading(false)); 
  },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
 