/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiFillDelete, AiFillEdit, AiOutlineFieldTime } from 'react-icons/ai';
import { BsBagCheckFill, BsCurrencyDollar } from 'react-icons/bs';
import { BiAddToQueue } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { loadMedicines, searchMedicines } from '../../redux/medicine/action';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Tooltip } from 'flowbite-react';


const Medicine = () => {

  const nav = useNavigate();
  let dispatch = useDispatch();

  const [state, setState] = useState();

  const { medicines, loading } = useSelector(state => state.medicines);

  useEffect(() => {
    dispatch(loadMedicines());
  }, []);

  const handleinput = (e) => {
    setState(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(searchMedicines(state));
  }


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Medicine</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2">
        <button onClick={() => { nav('/Medicine/add') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiAddToQueue className='mx-2' />Add Medicine</button>
        <button onClick={() => { nav('/Medicine/soldmedicines') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BsBagCheckFill className='mx-2' />Sold Medicines</button>
        <div className="dropdown dropdown-top ">
          <label tabIndex="0" className="btn text-black border-0 shadow-lg bg-gradient-to-r from-sky-400 to-cyan-300"><AiOutlineFieldTime />To be Expired</label>
          <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white dark:bg-secondary-dark-bg rounded-box w-52">
            <li>
              <button onClick={() => { nav('/Medicine/expiresin1') }}>
                In 1 month
              </button>
              <button onClick={() => { nav('/Medicine/expiresin6') }}>
                In 6 months
              </button>
            </li>
          </ul>
        </div>
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
                  if (medicines.length === 0) {
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
                              <th className="px-2 py-3">Description</th>
                              <th className="p-2 text-left">Batch No</th>
                              <th className="p-2 text-center">Unit</th>
                              <th className="p-2 text-left">Price</th>
                              <th className="p-2 text-left">Quantity</th>
                              <th className="p-2 text-left">Expire Date</th>
                              <th className="p-2 text-left">Category</th>
                              <th className="p-2 text-center">Type</th>
                              <th className="p-2 text-left">Action</th>
                            </tr>
                          </thead>
                          {medicines && medicines.map((item) =>
                            <tbody key={item.id}>
                              <tr>
                                <td>{item.description?.length > 14 ? item.description.substr(0, 15 - 1) + "..." : item.description}</td>
                                <td>{item.batchNo}</td>
                                <td>{item.unit}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}
                                  <div className='inline-flex mx-1 gap-1 text-white'>

                                    <Tooltip content="Edit Quantity">
                                      <button className="ml-1" onClick={(e) => {
                                        e.preventDefault();
                                        nav('/Medicine/edit/qunatity');
                                      }}>
                                        <AiFillEdit />
                                      </button>
                                    </Tooltip>

                                    <Tooltip content="Add Quantity">
                                      <button className="ml-1" onClick={(e) => {
                                        e.preventDefault();
                                        nav('/Medicine/add/qunatity');
                                      }}>
                                        <BiAddToQueue />
                                      </button>
                                    </Tooltip>

                                  </div>
                                </td>
                                <td>{item.expireDate?.length > 9 ? item.expireDate.substr(0, 11 - 1) + "..." : item.expireDate}</td>
                                <td>{item.category?.length > 9 ? item.category.substr(0, 11 - 1) + "..." : item.category}</td>
                                <td>{item.type}</td>
                                <th>
                                  <div className='inline-flex'>
                                    <Tooltip content="Sell Medicine">
                                      <button
                                        disabled={(localStorage.getItem('Med-Role') === "manager" ? true : false)}
                                        className="btn font-medium text-green-600 bg-main-bg dark:bg-main-dark-bg mr-2 hover:underline hover:bg-white"
                                        onClick={() => nav(`/Medicine/sell/${item.id}`)}>
                                        <BsCurrencyDollar />
                                      </button>
                                    </Tooltip>
                                    <Tooltip content="Edit Medicine">
                                      <button
                                        className="btn font-medium text-blue bg-main-bg dark:bg-main-dark-bg mr-2 hover:underline hover:bg-white"
                                        onClick={() => nav(`/Medicine/edit/${item.id}`)}>
                                        <AiFillEdit />
                                      </button>
                                    </Tooltip>
                                    <Tooltip content="Delete Medicine">
                                      <button
                                        className="btn font-medium text-red-600 bg-main-bg dark:bg-main-dark-bg mr-2 hover:underline hover:bg-white"
                                        onClick={() => nav(`/Medicine/delete/${item.id}`)}>
                                        <AiFillDelete />
                                      </button>
                                    </Tooltip>
                                  </div>
                                </th>
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

export default Medicine