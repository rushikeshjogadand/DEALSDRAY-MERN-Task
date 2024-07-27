import { Link, Outlet, useNavigate } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import { useCookies } from "react-cookie";

export function DashBoard(){
    const [cookies, setCookie, removeCookie] = useCookies("UserName")
    let  navigater = useNavigate();

    
    function handleLogout(){
        removeCookie("AdminName");
        navigater("/")
        window.location.reload();
    }


    return(
        <>
            <header>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse nav" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="links" to="/dashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="links" to="addemp">Add Employee List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="links" to="viewemp">Employee List</Link>
                            </li>
                            <li id="name" className="nav-item">
                               <h4 className="text-light">{cookies['UserName']} -</h4>
                            </li>


                            <li className="nav-item ms-5">
                           
                                        <Button  onClick={handleLogout} variant="outlined" color="error">Logout</Button> 
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
           <section>
                <h2 className="mt-2" align='center'>Welcome to Admin Panel</h2>
           </section>
            </header>
            <Outlet/>
        </>
    )
}