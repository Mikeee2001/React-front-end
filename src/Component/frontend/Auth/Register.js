import React, { useState } from "react";
import Navbar from '../../../Layouts/frontend/Navbar';
import axios from "axios";
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        role_as: 'user', // Default role
        error_list: [],
    });

    // Handle form input changes
    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    // Submit registration form
    const getRoleString = (role) => {
        switch (Number(role)) {
            case 0: return "user";
            case 1: return "admin";
            case 2: return "doctor";
            default: return "user"; // Default to "user"
        }
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            role_as: getRoleString(registerInput.role_as), // Send ENUM string, not number
        };

        console.log("Sending user data:", data);

        axios.post("/api/register", data)
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    history.push("/");
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            })
            .catch(error => {
                console.error("Server response:", error.response?.data || error);
                toast.error("Error registering user");
            });
    };


    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" placeholder="Full Name" />
                                        <span className="text-danger">{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" placeholder="Email" />
                                        <span className="text-danger">{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" placeholder="Password" />
                                        <span className="text-danger">{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
