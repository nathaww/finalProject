/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { TextInput, Label } from 'flowbite-react';
import { getBinCard, loadBinCard, searchBinCard } from '../../redux/medicine/action';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Bincard = () => {

  let dispatch = useDispatch();

  const nav = useNavigate();

  const [state, setState] = useState();

  useEffect(() => {
    dispatch({
      type: 'LOADED',
    })
  }, []);

  const { bincards, loading } = useSelector(state => state.medicines);
  console.log(bincards);

  useEffect(() => {
    dispatch(loadBinCard());
  }, []);

  const handleinput = (e) => {
    setState(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(searchBinCard(state));
  };

  let batchno, sdate, edate;

  const handleInputChange = (e) => {
    e.preventDefault();
    batchno = e.target.value;
    console.log(batchno);
  };
  const handleInputChange2 = (e) => {
    e.preventDefault();
    sdate = e.target.value;
    console.log(sdate);
  };
  const handleInputChange3 = (e) => {
    e.preventDefault();
    edate = e.target.value;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(getBinCard(batchno, sdate, edate));
  };

  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Bincard</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2">
        <button onClick={() => { nav('/DSS') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-2' />Back</button>
      </div>
      <div className="max-w-2xl mx-auto my-3">
        <form onSubmit={handleSearch}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input type="text" name="search" onChange={handleinput} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-secondary-dark-bg dark:placeholder-gray-400 dark:text-white border-gray-400" placeholder="Search" required />
            <button type='submit' className="text-black border-1 rounded-lg dark:text-white bg-main-bg dark:bg-main-dark-bg absolute right-2.5 bottom-1.5 bg-main font-medium text-sm px-4 py-2.5">Search</button>
          </div>
        </form>
      </div >
      {
        loading ?
          <div className='flex justify-center'>
            < Loading />
          </div >
          :
          <>
            <div className="col-span-12 flex justify-center">
              <div className="overflow-auto lg:overflow-visible ">
                <table className="table text-gray-400 border-separate space-y-6 text-sm">
                  <thead className="  text-white rounded-lg">
                    <tr>
                      <th className="p-2 text-left">ID</th>
                      <th className="px-2 py-3">Invoice</th>
                      <th className="p-2 text-left">Batch Number</th>
                      <th className="p-2 text-left">Med ID</th>
                      <th className="p-2 text-left">Date Received</th>
                      <th className="p-2 text-left">Amount Received</th>
                      <th className="p-2 text-left">Damaged</th>
                    </tr>
                  </thead>
                  {bincards && bincards.map((item) =>
                    <tbody key={item.id}>
                      <tr>
                        <td>{item.id?.length > 9 ? item.id.substr(0, 15 - 1) + "..." : item.id}</td>
                        <td>{item.invoice}</td>
                        <td>{item.batchNo}</td>
                        <td>{item.medicineId?.length > 9 ? item.medicineId.substr(0, 15 - 1) + "..." : item.medicineId}</td>
                        <td>{item.dateReceived}</td>
                        <td>{item.amountRecived}</td>
                        <td>{item.damaged}</td>
                      </tr>

                    </tbody>
                  )}

                </table>
              </div>

            </div>
          </>
      }
      <form className='mt-5' onSubmit={handelSubmit}>
        <p className='text-center my-2'>Get bin cards by date</p>
        <div className="flex flex-wrap lg:w-4/12 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
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
              onChange={handleInputChange}
            />
          </div>
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="Start Date"
              />
            </div>
            <TextInput
              id="title"
              type="date"
              sizing="md"
              onChange={handleInputChange2}
            />
          </div>
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="End Date"
              />
            </div>
            <TextInput
              id="title"
              type="date"
              sizing="md"
              onChange={handleInputChange3}
            />
          </div>

          <div className="mx-auto block">
            <button type='submit' className={`btn mt-3 mx-2 border-0 text-black bg-main-bg dark:bg-main-dark-bg dark:text-white dark:hover:bg-main-dark-bg hover:bg-white ${loading ? "loading" : ""}`}>
              Get
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Bincard