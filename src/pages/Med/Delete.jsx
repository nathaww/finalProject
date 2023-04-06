/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedicine } from '../../redux/medicine/action';


const Delete = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'LOADED',
        })
    }, [])


    let { id } = useParams();

    const [state, setState] = useState({
        dateReceived: "",
        invoice: "",
        quantity: "",
    });

    let { dateReceived, invoice, quantity } = state;

    const [error, setError] = useState("");


    const { loading } = useSelector(state => state.medicines);



    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!dateReceived || !quantity || !invoice) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            console.log("Final: ", state)
            dispatch(deleteMedicine(state, id));
            setError("");
        }
    };


    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>Delete Medicine</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <button onClick={() => { nav('/Medicine') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
            </div>
            <div className="max-w-2xl mx-auto my-3">

            </div>
            <form onSubmit={handelSubmit}>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
                    <div className="p-2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Quantity"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="number"
                            sizing="md"
                            name='quantity'
                            value={quantity || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Date Received"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="date"
                            sizing="md"
                            name='dateReceived'
                            value={dateReceived || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Invoice"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            name='invoice'
                            value={invoice || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mx-auto block">
                        <button type='submit' className={`btn mt-3 mx-2 border-0 text-white bg-red-600 hover:bg-red-700  ${loading ? "loading" : ""}`}>
                            Delete
                        </button>
                    </div>
                </div>
            </form>
            <p className='text-red-600 text-center'>{error}</p>
        </div>
    )
}

export default Delete