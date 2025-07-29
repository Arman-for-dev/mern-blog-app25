import React from 'react'
import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput} from "flowbite-react";
import { Link, useLocation} from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai";
import {FaMoon, FaSun} from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);

  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>ArNa's</span>
        Blog
      </Link>
      <form>
        <TextInput type='text ' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
      </form>
      <Button className='w-12 h-10 lg:hidden' color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=> dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {
          currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt='user'
                  img={currentUser.profilePicture}
                  rounded 
                />
              }
            >
              <DropdownHeader>
                <span className='block text-sm'>@ {currentUser.username}</span>
              </DropdownHeader>

              <DropdownItem>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to="/profile">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to='/sign-in'>
              <Button className='cursor-pointer bg-linear-65 from-purple-500 to-pink-500' color='gray' pill>
                Sign In
              </Button>
            </Link>
          )
        }
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink active={path === '/'} as={'div'}>
          <Link to='/'>
            Home
          </Link>
        </NavbarLink>
        <NavbarLink active={path === '/about'} as={'div'}>
          <Link to='/about'>
            About
          </Link>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}

export default Header