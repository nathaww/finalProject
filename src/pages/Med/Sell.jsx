/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsPaypal } from 'react-icons/bs';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellMedicine } from '../../redux/medicine/action';

const Sell = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'LOADED',
        })
    }, [])


    let { id } = useParams();

    const [state, setState] = useState({
        customerPhone: "",
        quantity: "",
        sellingDate: "",
        interval: "",
        endDate: "",
    });

    let { customerPhone, quantity, sellingDate, interval, endDate } = state;

    const [error, setError] = useState("");


    const { sell, loading } = useSelector(state => state.medicines);



    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!customerPhone || !quantity || !sellingDate || !interval || !endDate) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            console.log("Final: ", state)
            dispatch(sellMedicine(state, id));
            setError("");
        }
    };


    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>Sell Medicine</p>
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
                                value="Customer Phone"
                            />
                        </div>
                        <div className='inline-flex gap-2'>
                            <TextInput
                                id="small"
                                type="text"
                                sizing="md"
                                name='customerPhone'
                                value={customerPhone || ""}
                                onChange={handleInputChange}
                            />
                            <button className='bg-main-dark-bg px-3 rounded-md text-white'
                                onClick={(e) => { nav('/customers/add') }}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Selling Date"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="date"
                            sizing="md"
                            name='sellingDate'
                            value={sellingDate || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Interval"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            name='interval'
                            value={interval || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="End Date"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="date"
                            sizing="md"
                            name='endDate'
                            value={endDate || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mx-auto block">
                        <button type='submit' className={`btn mt-3 mx-2 border-0 text-white  ${loading ? "loading" : ""}`}>
                            Sell
                        </button>
                    </div>
                </div>
            </form>
            <p className='text-red-600 text-center'>{error}</p>

            <div>
                {
                    loading ?
                        <div className='flex justify-center'>
                            <p>Loading...</p>
                        </div >
                        :
                        <>
                            <div className="flex flex-wrap lg:w-6/12 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6 mt-5">
                                <div className="overflow-auto lg:overflow-visible ">
                                    <p className='text-lg font-bold mb-2 text-center'>Transaction Detail</p>
                                    <div className='overflow-auto flex flex-row gap-5 justify-center px-3'>
                                        <div>
                                            {sell && sell.map((item) => (
                                                <>
                                                    <div className='flex justify-center flex-col' key={item.transactionId}>
                                                        <p>Transaction ID - {item.transactionId}</p>
                                                        <button className={`btn mt-3 mx-2 border-0 text-white inline-flex gap-1  ${loading ? "loading" : ""}`}
                                                            onClick={(e) => { nav('/Medicine/checkout') }}>
                                                            <BsPaypal />
                                                            Pay
                                                        </button>
                                                    </div>
                                                </>
                                            ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Sell