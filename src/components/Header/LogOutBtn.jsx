import React from 'react'
import { useDispatch } from 'react-redux';
import {logout} from '../../store/AuthFile';
import authService from '../../AppWrite/Auth';

function LogOutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout()
        .then(() => dispatch(logout()));
    }
  return (
    <button 
        onClick={logoutHandler}
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    >
        LogOut
    </button>
  )
}

export default LogOutBtn