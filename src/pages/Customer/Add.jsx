/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addCustomer } from '../../redux/customer/customerAction';

const AddCustomer = () => {

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
    });

    let { name, phoneNo } = state;

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!name || !phoneNo) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            dispatch(addCustomer(state));
            setError("");
        }
    };

    const handleClear = (e) => {
        e.preventDefault();
        setState({
            name: "",
            phoneNo: "",
        });
    }

    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>{loading ? "Loading..." : "Add Customer"}</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center mb-3">
                <button onClick={() => { nav('/customers') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
            </div>

            <form onSubmit={handelSubmit}>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
                    <div className="p-2 w-full">
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
                            placeholder='Ex:- Abebayehu'
                            value={name || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 w-full">
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
                            placeholder='Ex:- +251912345678'
                            value={phoneNo || ""}
                            onChange={handleInputChange}
                        />
                        <p className='text-gray-400 my-1 text-sm'>Note: Make sure your are not adding an existing customers phone number or name!</p>
                    </div>

                    <div className="mx-auto block">
                        <button type='submit' className={`btn mt-3 mx-2 border-0 text-black bg-main-bg dark:bg-main-dark-bg dark:text-white dark:hover:bg-main-dark-bg hover:bg-white ${loading ? "loading" : ""}`}>
                            Upload
                        </button>
                        <button onClick={handleClear} className="btn mt-3 mx-2 border-0 text-white bg-blue-600 hover:bg-blue-500">
                            Clear
                        </button>
                    </div>
                </div>
            </form>
            <p className='text-red-600 text-center'>{error}</p>
        </div>
    )
}

export default AddCustomer