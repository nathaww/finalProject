/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { AiOutlineSearch, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { deleteCustomer, loadCustomers } from '../../redux/customer/customerAction';

const Customers = () => {

  const nav = useNavigate();

  let dispatch = useDispatch();

  const { customers, loading } = useSelector(state => state.customers);


  useEffect(() => {
    dispatch(loadCustomers());
  }, [])


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Customers</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <button disabled={(localStorage.getItem('Med-Role') === "manager" ? true : false)} onClick={() => { nav('/customers/add') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiAddToQueue className='mx-2' />Add Customers</button>
      </div>
      <div className="max-w-2xl mx-auto my-3">
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input type="number" id="id" name="search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-secondary-dark-bg dark:placeholder-gray-400 dark:text-white border-gray-400" placeholder="Search" required />
            <button className="text-black border-1 rounded-lg dark:text-white bg-main-bg dark:bg-main-dark-bg absolute right-2.5 bottom-1.5 bg-main font-medium text-sm px-4 py-2.5">Search</button>
          </div>
        </form>
      </div>

      {loading ?
        <div className='flex justify-center'>
          <Loading />
        </div>
        :
        <>
          <div className="col-span-12 flex justify-center">
            <div className="overflow-auto lg:overflow-visible ">
              <table className="bg-transparent table text-gray-400 border-separate space-y-6 text-sm">
                <thead className="bg-white dark:bg-gray-800 text-white rounded-lg">
                  <tr>
                    <th className="px-2 py-3">Name</th>
                    <th className="p-2 text-left">Phone Number</th>
                    <th className="p-2 text-center">ID</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                {customers && customers.map((item) =>
                  <tbody key={item.id}>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.phoneNo}</td>
                      <td>{item.id}</td>
                      <th>
                        <button
                          className="btn font-medium text-blue bg-main-bg dark:bg-main-dark-bg mr-2 hover:underline hover:bg-white"
                          onClick={() => nav(`/customers/edit/${item.id}`)}>
                          <AiFillEdit />
                        </button>
                        <button
                          className="btn font-medium text-red-600 bg-main-bg dark:bg-main-dark-bg mr-2 hover:underline hover:bg-white"
                          onClick={() => {
                            dispatch(deleteCustomer(item.id));
                          }
                          }>
                          <AiFillDelete />
                        </button>
                      </th>
                    </tr>

                  </tbody>
                )}

              </table>
            </div>

          </div>
        </>}
    </div>
  )
}

export default Customers