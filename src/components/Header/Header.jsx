import React from 'react'
import {Container , Logo,LogOutBtn} from '../index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
  const statusOfAuth = useSelector((state)=>state.auth.status);
  const navigate = useNavigate();
  const navbarItems = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active:!statusOfAuth
    },
    {
      name:"SignUp",
      slug:"/signup",
      active:!statusOfAuth
    },
    {
      name:"All Posts",
      slug:"/all-posts",
      active:statusOfAuth
    },
    {
      name:"Add Post",
      slug:"/add-post",
      active:statusOfAuth
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container >
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/' className='text-white hover:text-gray-300'>
              <Logo width = '70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navbarItems.map((item) => 
              item.active ? (
                <li key={item.name} >
                  <button
                    onClick={()=>navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {statusOfAuth && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul> 
        </nav>
      </Container>
    </header>
  )
}

export default Header