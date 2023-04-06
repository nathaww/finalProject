/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getSingleNotification, updateNotification } from '../../redux/notification/action';

const EditNotification = () => {
    
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch({
            type: "LOADED"
        })
    }, []);

    useEffect(() => {
        dispatch(getSingleNotification(id));

    }, []);

    const { notification, loading } = useSelector(state => state.notifications);

    useEffect(() => {
        if (notification) {
            let data;
            data = {
                id: notification.id,
                batchNo: notification.batchNo,
                endDate: notification.endDate,
                nextDate: notification.nextDate,
                interval: notification.interval,
                phoneNo: notification.phoneNo,
            }
            setState({ ...data });
        }
    }, [notification]);

    const [state, setState] = useState({
        id: "",
        phoneNo: "",
        batchNo: "",
        interval: "",
        endDate: "",
        nextDate: ""

    });

    let { phoneNo, batchNo, interval, endDate, nextDate } = state;

    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!batchNo || !phoneNo || !interval || !endDate || !nextDate) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            setError("");
            dispatch(updateNotification(state, id))
        }
    };

    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>{loading ? "Loading..." : "Add Notification"}</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <button onClick={() => { nav('/notification') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
            </div>
            <div className="max-w-2xl mx-auto my-3">

            </div>
            <form onSubmit={handelSubmit}>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
                    <div className="p-2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Batch Number"
                            />
                        </div>
                        <TextInput
                            id="title"
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
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Interval"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="number"
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
                                value="Next Date"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="date"
                            sizing="md"
                            name='nextDate'
                            value={nextDate || ""}
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

export default EditNotification;