import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



export function HomePage(){
 
    const [Users , setUsers] = useState([{userName:'',f_Pwd:''}])
    const [cookies, setCookie, removeCookie] = useCookies('UserName')
    const [Error , SetError] = useState('')
    const [errorpass , Seterrorpass] = useState('');
    let navigater = useNavigate();

    useEffect(()=>{
        axios.get("http://127.0.0.1:5050/admin")
        .then ((response) =>{
            setUsers(response.data);
            console.log(response.data)
        })
    },[])


    
    function VerifyEmail(e){
        for(var usernames of Users ){

            if(usernames.userName === e.target.value ){
                SetError("")
                break
            }
            else{
                SetError("Invalide UserName")
            }
            
        }
    }

    function VerifyPassword(e){
        for(var pass of Users ){

            if(pass.f_Pwd === e.target.value ){
                Seterrorpass("")
                break
            }
            else{
                Seterrorpass("Invalide Password")
            }
            
        }
    }


    const fomik = useFormik ({
        initialValues:{
            userName :'',
            f_Pwd:''
        },
        onSubmit:(value) =>{
            var user = Users.find( item => item.userName === value.userName);
            
            if(user.f_Pwd === value.f_Pwd){
                setCookie("UserName" , user.userName);
                navigater("/dashboard")
            }


        }
    })



    return(
        <>
        <header>
        <nav className="navbar navbar-expand-lg bg-dark ">
                <div className="container-fluid">
                    <h1 className="navbar-brand text-white">Login Page </h1>
                   
                </div>
            </nav>
            
        </header>
            <div className="d-flex justify-content-center mt-4">
                <form onSubmit={fomik.handleSubmit}  className="adminform"  >

                    <dl className='mt-4' style={{ width: '320px' }}>
                        <dt>User Name</dt>
                        <dd><input type="text" onChange={fomik.handleChange} onBlur={VerifyEmail} required className="form-control mt-2" name="userName" /></dd>
                        <dd className="text-danger">{Error}</dd>
                        <dt>Password</dt>
                        <dd><input onKeyUp={VerifyPassword}  onChange={fomik.handleChange} type="text"required className="form-control mt-2" name="f_Pwd" /></dd>
                        <dd className="text-danger">{errorpass}</dd>
                       
                    </dl>
                    <Button className="w-100 mt-3" type="submit" variant="contained" color="secondary">
                        <b>Login</b>
                    </Button>
                </form>
            </div>
        </>
    )
}