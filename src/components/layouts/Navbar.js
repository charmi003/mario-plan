import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from '@firebase/auth'
import { setUser } from '../../redux'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { logOut } from '../../redux';


const Navbar = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const auth=getAuth();
    const [user,loading,error] = useAuthState(auth);
    if(user)
        dispatch(setUser(user.email));

    const userObj = useSelector(state => state.auth.user);

    useEffect(()=>{
        // Initialize All Required DOM Element
        const burgerMenu = document.getElementById("burger");
        const navbarMenu = document.getElementById("menu");


        // Initialize Responsive Navbar Menu
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("active");
            navbarMenu.classList.toggle("active");

            if (navbarMenu.classList.contains("active")) {
                navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";
            } else {
                navbarMenu.removeAttribute("style");
            }
        });

        const navLink = document.querySelectorAll(".nav-link");

        navLink.forEach(n => n.addEventListener("click", closeMenu));

        function closeMenu() {
            burgerMenu.classList.remove("active");
            navbarMenu.classList.remove("active");
            navbarMenu.removeAttribute("style");
            
        }
    },[])

    
    return (
        <nav className="navbar">
        <div className="container">
            <section className="wrapper">

                <p className="brand"><Link to='/' className="brand-link">Mario Plan</Link></p>
                <button type="button" className="burger" id="burger">
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                    <span className="burger-line"></span>
                </button>

                <div className="menu" id="menu">
                    {
                        user ?
                        <ul className="menu-inner">
                            <li>
                                <NavLink to="/create-project" className="nav-link">Create Project</NavLink>
                            </li>
                            <li>
                                <NavLink to="/my-projects" className="nav-link">My Projects</NavLink>
                            </li>
                            <li className="md:hidden">
                                <NavLink to="/notifications" className="nav-link">
                                    Notifications
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="nav-link" onClick={ (e)=>dispatch(logOut(alert)) }>Log Out</NavLink>
                            </li>
                            <li>
                                <NavLink to="/" className="btn btn-floating waves-effect grey nav-link">{userObj && userObj.firstName[0]}{userObj && userObj.lastName[0]}</NavLink>
                            </li>
                        </ul>
                        : 
                        <ul className="menu-inner">
                            <li>
                                <NavLink to="/sign-up" className="nav-link">Sign Up</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sign-in" className="nav-link">Log In</NavLink>
                            </li>
                        </ul>
                    }
                
                </div>
            </section>
        </div>
    </nav>
    )
}

export default Navbar
