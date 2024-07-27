import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from "yup";

export function ViewEmp() {
    const [Users, setUsers] = useState([]);
    const [search, setsearch] = useState('');
    const [emailerror, setemailerror] = useState('')
    const [error, seterror] = useState('')
    const [Editappointment, setEditAppointment] = useState([{
        UserId: '', Email: '', Mobile: '', emplist: '', male: '', Mca: '',
        Bca: '', Bsc: '',
    }]);


    useEffect(() => {
        axios.get('http://127.0.0.1:5050/getemp')
            .then((response) => {
                setUsers(response.data);
            })
    }, [])


    function DeleteAppointment(e) {
        axios.delete(`http://127.0.0.1:5050/getemp/${e.target.name}`)
        alert("are you want to delete this file")
        window.location.reload();

    }

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


    function handleEditClick(Mobaile) {
        axios.get(`http://127.0.0.1:5050/getemp/${Mobaile}`)
            .then(response => {
                setEditAppointment(response.data);
            })
            .catch(error => {
                console.error('Error fetching edit data:', error);
            });
    }


    const editFormik = useFormik({
        initialValues: {
            UserId: Editappointment[0].UserId,
            Email: Editappointment[0].Email,
            Mobile: Editappointment[0].Mobile,
            emplist: Editappointment[0].emplist,
            male: Editappointment[0].male,
            Mca: Editappointment[0].Mca,
            Bca: Editappointment[0].Bca,
            Bsc: Editappointment[0].Bsc
        },
        validationSchema: Yup.object({
            UserId: Yup.string()
                .required('Name is required'),
            Mobile: Yup.string()
                .matches(/^[0-9]{10}$/, 'Must be a valid mobile number')
                .required('Mobile number is required'),
        })
        ,
        onSubmit: (values) => {
            axios.put(`http://127.0.0.1:5050/edittask/${Editappointment[0].Email}`, values)
                .then(() => {
                    alert('Emp is Edited');
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error updating appointment:', error);
                });
        },
        enableReinitialize: true
    });




    return (
        <>
            <div>
                <h4 className='mt-3' align='center '>Total Count : <span className='text-danger'>{Users.length}</span></h4>
            </div>

            <div style={{ float: 'right' }} className='mt-4 me-2 mb-2'>
                <form>
                    <input onChange={(e) => setsearch(e.target.value)} className='form-control me-5' placeholder='Enter Search keyword' type="text" />
                </form>
            </div>
            <table className='table table-hover   border-primary'>

                <thead className='table-bordered border-primary'>

                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobaile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create date</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {

                        Users.filter((item) => {
                            return search.toLowerCase() === '' ? item : item.UserId.toLowerCase().includes(search)
                        }).map((item, index) =>
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={`data:image/jpeg;base64,${item.Img}`} alt="" width="100" height="70" />

                                </td>


                                <td>{item.UserId}</td>
                                <td>{item.Email}</td>
                                <td>{item.Mobile}</td>
                                <td>{item.emplist}</td>
                                <td>{item.male}</td>
                                <td>{item.Mca}</td>
                                <td>{item.Date}</td>

                                <td>
                                    <Button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(item.Mobile)} style={{ fontSize: '22px' }} className="bi bi-pencil-square " color="info">

                                    </Button>

                                    <Button style={{ fontSize: '22px', marginLeft: '-20px' }} onClick={DeleteAppointment} name={item.Mobile} className="bi bi-trash3-fill " color="error">
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>



            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Appointment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editFormik.handleSubmit}  >

                                <div >
                                    <div>
                                        <div>
                                            <dl >
                                                <dt> Name</dt>
                                                <dd><input type="text" onChange={editFormik.handleChange} value={editFormik.values.UserId} className="form-control mt-2" name="UserId" onBlur={editFormik.handleBlur} /> {editFormik.touched.UserId && editFormik.errors.UserId ? (
                                                    <div className="text-danger">{editFormik.errors.UserId}</div>
                                                ) : null}</dd>
                                                <dt>Email</dt>
                                                <dd><input type="text" onKeyUp={VerifyEmail} onChange={editFormik.handleChange} value={editFormik.values.Email} required className="form-control mt-2" name="Email" /></dd>
                                                <dd className="text-danger">{emailerror}</dd>

                                                <dt>Mobile No</dt>
                                                <dd><input type="number" onChange={editFormik.handleChange} value={editFormik.values.Mobile} onBlur={editFormik.handleBlur} required className="form-control mt-2" name="Mobile" /> {editFormik.touched.Mobile && editFormik.errors.Mobile ? (
                                                    <div className="text-danger">{editFormik.errors.Mobile}</div>
                                                ) : null}</dd>

                                            </dl>
                                        </div>
                                        <div>
                                            <dl >
                                                <dt>Designation</dt>
                                                <dd>
                                                    <select name="emplist" onChange={editFormik.handleChange} value={editFormik.values.emplist} className="form-control" >
                                                        <option value="hr">HR</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="sales">Sales</option>

                                                    </select>
                                                </dd>
                                                <dt>Gender</dt>
                                                <dd>
                                                    <input className="form-radio " onChange={editFormik.handleChange} value={editFormik.values.male} name="male" type='radio' /> <label className="me-3">Male</label>
                                                    <input name="male" onChange={editFormik.handleChange} value={editFormik.values.male} type="radio" /><label>Female</label>
                                                </dd>

                                                <dt>Course</dt>
                                                <dd>
                                                    <input onChange={editFormik.handleChange} value={editFormik.values.Mca} name="Mca" type="checkbox" /> <label className="me-3">MCA</label>
                                                    <input onChange={editFormik.handleChange} value={editFormik.values.Bca} name="Bca" type="checkbox" /> <label className="me-3">BCA</label>
                                                    <input onChange={editFormik.handleChange} value={editFormik.values.Bsc} name="Bsc" type="checkbox" /> <label >BSC</label>
                                                </dd>
                                                <dt>Img Upload</dt>
                                                <dd>
                                                    <img src={editFormik.values.Img} alt="" />
                                                    <input onChange={editFormik.handleChange} name="Img" className="form-control mt-2" accept="image/*" type="file" />
                                                </dd>


                                            </dl>

                                        </div>
                                        <Button data-bs-dismiss="modal" variant="outlined" type="submit" className=" mt-3 mb-3 w-100 " color="secondary"><b>Update </b></Button>

                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}