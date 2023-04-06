/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../../redux/medicine/action';


const EditQuantity = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        id: "",
        batchNo: "",
        invoice: "",
        quantity: "",
    });

    let { batchNo, invoice, quantity } = state;

    const [error, setError] = useState("");


    const { loading } = useSelector(state => state.medicines);



    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!batchNo || !quantity || !invoice) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            console.log("Final: ", state)
            dispatch(updateQuantity(state));
            setError("");
        }
    };


    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>Edit Qunatity</p>
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
                                value="Batch Number"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            name='batchNo'
                            value={batchNo || ""}
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

export default EditQuantity