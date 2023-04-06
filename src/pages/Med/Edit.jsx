/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleMed, updateMedicine } from '../../redux/medicine/action.js';
import { useParams } from 'react-router-dom';


const Edit = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        id: "",
        batchNo: "",
        expireDate: "",
        unit: "",
        quantity: "",
        price: "",
        description: "",
    });

    let { id } = useParams();
    let { batchNo, expireDate, unit, price, description, category, type, } = state;

    const [error, setError] = useState("");

    const handleSelectChange = (e) => {
        setState({ ...state, type: e.target.value });
    };

    const handleSelectChangeCat = (e) => {
        setState({ ...state, category: e.target.value });
    };

    useEffect(() => {
        dispatch(getSingleMed(id));
    }, [])

    const { medicine, loading } = useSelector(state => state.medicines);

    useEffect(() => {
        if (medicine) {
            let data;
            data = {
                id: medicine.id,
                batchNo: medicine.batchNo,
                expireDate: medicine.expireDate,
                unit: medicine.unit,
                price: medicine.price,
                description: medicine.description,
                type: medicine.type,
                category: medicine.category
            }
            setState({ ...data });
        }
    }, [medicine]);

    console.log('Medicine', state);


    const handleInputChange = (e) => {
        console.log(state);
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handelSubmit = (e) => {

        e.preventDefault();
        if (!batchNo || !expireDate || !unit || !price || !description || !type || !category) {
            setError("Empty field(s)! Please check for empty field(s) and try again.")
        } else {
            console.log("Final: ", state)
            dispatch(updateMedicine(state, id));
            setError("");
        }
    };


    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>Edit Medicine</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <button onClick={() => { nav('/Medicine') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
            </div>
            <div className="max-w-2xl mx-auto my-3">

            </div>
            <form onSubmit={handelSubmit}>
                <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">

                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Category"
                            />
                        </div>
                        <select className='rounded-md dark:bg-main-dark-bg xl:w-64 lg:w-44' onChange={handleSelectChangeCat}>
                            <option value="0">Select</option>
                            <option value={"Anti-Fungal"}>Anti Fungal</option>
                            <option value={"Anti-Allergy"}>Anti-Allergy</option>
                            <option value={"Anti-Helmentic"}>Anti-Helmentic</option>
                            <option value={"Hormonal Drugs"}>Hormonal Drugs</option>
                            <option value={"ENT Drugs"}>ENT Drugs</option>
                            <option value={"NSAI"}>NSAI</option>
                            <option value={"GIT"}>GIT</option>
                            <option value={"Anti-Respiratory"}>Anti-Respiratory</option>
                            <option value={"Narcotic and Anti-Psychotropic"}>Narcotic and Anti-Psychotropic</option>
                            <option value={"Anti-Biotic"}>Anti-Biotic</option>
                            <option value={"Vitamins and Minerals"}>Vitamins and Minerals</option>
                            <option value={"CSV Drugs"}>CSV Drugs</option>
                        </select>
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Type"
                            />
                        </div>
                        <select className='rounded-md dark:bg-main-dark-bg xl:w-64 lg:w-44' onChange={handleSelectChange}>
                            <option value="0">Select</option>
                            <option value={"LongTerm"}>Long Term</option>
                            <option value={"ShortTerm"}>Short Terms</option>
                        </select>
                    </div>
                    {/* <div className="p-2 sm:w-1/2 w-full">
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
                    </div> */}
                    <div className="p-2 sm:w-1/2 w-full">
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
                                value="Expire Date"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="date"
                            sizing="md"
                            name='expireDate'
                            value={expireDate || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Unit"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            name='unit'
                            value={unit || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 sm:w-1/2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Price"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="number"
                            sizing="md"
                            addon="ETB"
                            name='price'
                            value={price || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="p-2 w-full">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="small"
                                value="Description"
                            />
                        </div>
                        <TextInput
                            id="small"
                            type="text"
                            sizing="md"
                            name='description'
                            value={description || ""}
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

export default Edit