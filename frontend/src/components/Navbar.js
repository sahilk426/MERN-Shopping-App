import React from 'react'
import logo from '../assets/logo.png'
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoggedIn } from '../redux/slices/loginSlice';
import { loggedInUser } from '../redux/slices/currentUser';
import { toast } from 'react-hot-toast';
import { clear } from '../redux/slices/cartSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const { cart,loggedIn } = useSelector((state) => state);
    function logoutHandler() {
        dispatch(clear());
        dispatch(setIsLoggedIn(false));
        dispatch(loggedInUser({}));
        toast.error("Logged Out");
    }
  return (
    <div>
        <nav className="h-[60px] flex justify-around items-center bg-[#0F172A] text-white">
            <div>
                <Link to='/'>
                    <img src={logo} className="h-[40px] w-fit" alt='logo'></img>
                </Link>
            </div>
            <div className="flex justify-between gap-3 items-center">
                <NavLink to='/'>
                    <div>Home</div>
                </NavLink>
                {!loggedIn && 
                    <div>
                        <NavLink to='/login'>
                            <div>Login</div>
                        </NavLink>
                    </div>
                }
                {loggedIn && 
                    <div>
                        <Link onClick={logoutHandler}>
                            <div>Log Out</div>
                        </Link>
                    </div>
                }
                <NavLink to="/cart">
                <div className="relative">
                    <FaShoppingCart className="text-2xl"/>
                    {
                    cart.length > 0 &&
                    <span className="absolute -top-1 -right-2 bg-green-600 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">{cart.length}</span>
                    }
                </div>
                </NavLink>
                
            </div>
        </nav>
    </div>
  )
}

export default Navbar