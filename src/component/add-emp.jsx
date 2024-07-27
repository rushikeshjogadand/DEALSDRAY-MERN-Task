import { useEffect, useState } from "react";
import * as React from 'react';

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "bootstrap";

export function AddEmp() {
    const [Users, setUsers] = useState([]);

    const [error, seterror] = useState('')
    const [emailerror, setemailerror] = useState('')

    useEffect(() => {
        axios.get('http://127.0.0.1:5050/getemp')
            .then((response) => {
                setUsers(response.data);
            })
    }, [])

    function VerifyEmail(e) {
        for (var user of Users) {
            if (user.Email === e.target.value) {

                seterror('already exists')
                break

            }
            else {
                seterror('')
            }
        }
        if (e.target.value.endsWith('@gmail.com')) {
            setemailerror('')
        }
        else {
            setemailerror('Plz Enter @gmail.com')
        }
    }





    function Submit(e) {
        e.preventDefault();


        const fomdata = new FormData(e.target);
        axios.post('http://127.0.0.1:5050/adddemp', fomdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert("Task Add")
        window.location.reload()

    }


    const formik = useFormik({
        initialValues: {
            UserId: '',
            Email: '',
            Mobile: '',
        },
        validationSchema: Yup.object({
            UserId: Yup.string()
                .required('Name is required'),
            Mobile: Yup.string()
                .matches(/^[0-9]{10}$/, 'Must be a valid mobile number')
                .required('Mobile number is required'),
        })
    });


    return (
        <>


            <div className="d-flex justify-content-center mt-4">
                <form onSubmit={Submit} className="addemp"  >
                    <dl style={{ width: '500px' }}>
                        <dt> Name</dt>
                        <dd><input type="text" required className="form-control mt-2" onBlur={formik.handleBlur} name="UserId" /> {formik.touched.UserId && formik.errors.UserId ? (
                            <div className="text-danger">{formik.errors.UserId}</div>
                        ) : null}</dd>
                        <dt>Email</dt>
                        <dd><input type="text" onKeyUp={VerifyEmail} required className="form-control mt-2" name="Email" /></dd>
                        <dd className="text-danger">{error}</dd>
                        <dd className="text-danger">{emailerror}</dd>
                        <dt>Mobile No</dt>
                        <dd><input type="number" required onBlur={formik.handleBlur} className="form-control mt-2" name="Mobile" />   {formik.touched.Mobile && formik.errors.Mobile ? (
                            <div className="text-danger">{formik.errors.Mobile}</div>
                        ) : null}</dd>
                        <dt>Designation</dt>
                        <dd><select className="form-select mt-2" name="emplist">
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="sales">Sales</option>
                        </select></dd>
                        <dt>Gender</dt>
                        <dd>
                            <input className="form-radio " name="male" value='male' type='radio' /> <label className="me-3">Male</label>
                            <input name="male" value='female' type="radio" /><label>Female</label>
                        </dd>
                        <dt>Course</dt>
                        <dd>
                            <input name="Mca" value="MCA" type="checkbox" /> <label className="me-3">MCA</label>
                            <input name="Bca" value="BCA" type="checkbox" /> <label className="me-3">BCA</label>
                            <input name="Bsc" value="BSC" type="checkbox" /> <label >BSC</label>
                        </dd>
                        <dt>Img Upload</dt>
                        <dd>
                            <input name="Img" accept="image/*" className="form-control mt-2" type="file" />
                        </dd>


                    </dl>

                    <button type="submit" className="btn btn-primary w-100 mt-3"><b>Submit</b></button>
                </form>
            </div>
        </>
    )

}