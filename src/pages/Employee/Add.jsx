/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from '../../redux/employee/employeeAction';

const AddEmployee = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "LOADED"
        })
    }, [])

    const { loading } = useSelector(state => state.customers);

    const [state, setState] = useState({
        name: "",
        phoneNo: "",
        email: "",
        userName: "",
        role: "",
        password: "",
    });

    let { name, phoneNo, email, userName, role, password } = state;

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSelectChangeCat = (e) => {
        setState({ ...state, role: e.target.value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!name || !phoneNo || !userName || !email || !password || !role) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            dispatch(addEmployee(state));
            setError("");
        }
    };

    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>{loading ? "Loading..." : "Add Customer"}</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center mb-3">
                <button onClick={() => { nav('/Employees') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
            </div>

            <form onSubmit={handelSubmit}>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Name"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            sizing="md"
                            name='name'
                            value={name || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="User Name"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            sizing="md"
                            name='userName'
                            value={userName || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="E-Mail"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="email"
                            sizing="md"
                            name='email'
                            value={email || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Phone Number"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            sizing="md"
                            name='phoneNo'
                            value={phoneNo || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Password"
                            />
                        </div>
                        <TextInput
                            id="title"
                            type="password"
                            sizing="md"
                            name='password'
                            value={password || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Role"
                            />
                        </div>
                        <select className='rounded-md dark:bg-main-dark-bg xl:w-64 lg:w-44' onChange={handleSelectChangeCat}>
                            <option value="0">Select</option>
                            <option value={"manager"}>Manager</option>
                            <option value={"pharmacist"}>Pharmacist</option>
                        </select>
                    </div>
                    <div className="mx-auto block">
                        <button type='submit' className={`btn mt-3 mx-2 border-0 text-black bg-main-bg dark:bg-main-dark-bg dark:text-white dark:hover:bg-main-dark-bg hover:bg-white ${loading ? "loading" : ""}`}>
                            Create account
                        </button>
                    </div>
                </div>
            </form>
            <p className='text-red-600 text-center'>{error}</p>
        </div>
    )
}

export default AddEmployee