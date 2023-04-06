/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { searchSoldMedicines, soldMedicines } from '../../redux/medicine/action';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';


const SoldMedicine = () => {

  const nav = useNavigate();
  let dispatch = useDispatch();

  const [state, setState] = useState();

  const { sold, loading } = useSelector(state => state.medicines);

  useEffect(() => {
    dispatch(soldMedicines());
  }, []);

  const handleinput = (e) => {
    setState(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(searchSoldMedicines(state));
  }


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Sold Medicines</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2">
        <button onClick={() => { nav('/Medicine') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
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
                {(() => {
                  if (sold.length === 0) {
                    return (
                      <div className='flex justify-center'>
                        <p className='text-center text-xl'>No items</p>
                      </div>
                    )
                  } else {
                    return (
                      <>
                        <table className="table text-gray-400 border-separate space-y-6 text-sm">
                          <thead className="  text-white rounded-lg">
                            <tr>
                              <th className="px-2 py-3">Transaction ID</th>
                              <th className="p-2 text-left">Pharamcist ID</th>
                              <th className="p-2 text-left">Customer Phone</th>
                              <th className="p-2 text-left">Med ID</th>
                              <th className="p-2 text-left">Quantity</th>
                              <th className="p-2 text-left">Selling Price</th>
                              <th className="p-2 text-left">Selling Date</th>
                            </tr>
                          </thead>
                          {sold && sold.map((item) =>
                            <tbody key={item.id}>
                              <tr>
                                <td>{item.transactionId?.length > 14 ? item.transactionId.substr(0, 25 - 1) + "..." : item.transactionId}</td>
                                <td>{item.pharmacistId}</td>
                                <td>{item.customerPhone}</td>
                                <td>{item.medicineId?.length > 14 ? item.medicineId.substr(0, 25 - 1) + "..." : item.medicineId}</td>
                                <td>{item.quantity}</td>
                                <td>{item.sellingPrice}</td>
                                <td>{item.sellingDate}</td>
                              </tr>

                            </tbody>
                          )}

                        </table>
                      </>
                    )
                  }
                })()}
              </div>

            </div>
          </>
      }
    </div >
  )
}

export default SoldMedicine