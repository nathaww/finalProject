/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { expiresin6 } from '../../redux/medicine/action';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'flowbite-react';
import Loading from '../../components/Loading';


const ExpiredIn6Month = () => {

  const nav = useNavigate();
  let dispatch = useDispatch();

  const { ex6, loading } = useSelector(state => state.medicines);

  useEffect(() => {
    dispatch(expiresin6());
  }, []);


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Expires in 6 Months</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2 mb-5">
        <button onClick={() => { nav('/Medicine') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
      </div>

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
                  if (ex6.length === 0) {
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
                              <th className="p-2 text-center">Action</th>
                            </tr>
                          </thead>
                          {ex6 && ex6.map((item) =>
                            <tbody key={item.id}>
                              <tr>
                                <td>{item.description?.length > 14 ? item.description.substr(0, 25 - 1) + "..." : item.description}</td>
                                <td>{item.batchNo}</td>
                                <td>{item.unit}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.expireDate?.length > 9 ? item.expireDate.substr(0, 11 - 1) + "..." : item.expireDate}</td>
                                <td>{item.category?.length > 9 ? item.category.substr(0, 11 - 1) + "..." : item.category}</td>
                                <td>{item.type}</td>
                                <td>
                                  <Tooltip content="Delete Medicine">
                                    <button
                                      className="btn font-medium text-red-600 bg-main-bg dark:bg-main-dark-bg mr-2 hover:underline hover:bg-white"
                                      onClick={() => nav(`/Medicine/delete/${item.id}`)}>
                                      <AiFillDelete />
                                    </button>
                                  </Tooltip>
                                </td>
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

export default ExpiredIn6Month