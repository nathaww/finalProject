/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleCustomer, updateCustomer } from '../../redux/customer/customerAction';


const EditCustomer = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        id: "",
        name: "",
        phoneNo: "",
    });

    let { id } = useParams();
    let { name, phoneNo } = state;

    useEffect(() => {
        dispatch(getSingleCustomer(id));
    }, [])


    const [error, setError] = useState("");

    const { customer, loading } = useSelector(state => state.customers);

    useEffect(() => {
        if (customer) {
            let data;
            data = {
                id: customer.id,
                name: customer.name,
                phoneNo: customer.phoneNo,

            }
            setState({ ...data });
        }
    }, [customer]);

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
            console.log("Final: ", state)
            dispatch(updateCustomer(state));
            setError("");
        }
    };


    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>Edit Customer</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <button onClick={() => { nav('/customers') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
            </div>
            <div className="max-w-2xl mx-auto my-3">

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
                                value="Phone Number"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            name='phoneNo'
                            value={phoneNo || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mx-auto block">
                        <button type='submit' className={`btn mt-3 mx-2 border-0 text-black bg-main-bg dark:bg-main-dark-bg dark:text-white dark:hover:bg-main-dark-bg hover:bg-white ${loading ? "loading" : ""}`}>
                            Update
                        </button>
                    </div>
                </div>
            </form>
            <p className='text-red-600 text-center'>{error}</p>
        </div>
    )
}

export default EditCustomer