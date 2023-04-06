/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { loadNotifications, searchNotification, sendAllNotifications } from '../../redux/notification/action';


const Notification = () => {

  let dispatch = useDispatch();
  const [state, setState] = useState();
  const { notifications, loading } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(loadNotifications());
  }, []);

  const handleinput = (e) => {
    setState(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(searchNotification(state));
  }
  const handleNotif = () => {
    dispatch(sendAllNotifications());
  }


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Notification</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <button onClick={handleNotif} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiAddToQueue className='mx-2' />Send Notifications</button>
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
                      <th className="px-2 py-3">ID</th>
                      <th className="p-2 text-left">Phone Number</th>
                      <th className="p-2 text-left">Batch Number</th>
                      <th className="p-2 text-left">Interval</th>
                      <th className="p-2 text-left">End Date</th>
                      <th className="p-2 text-left">Next Date</th>
                    </tr>
                  </thead>
                  {notifications && notifications.map((item) =>
                    <tbody key={item.id}>
                      <tr>
                        <td>{item.id?.length > 14 ? item.id.substr(0, 25 - 1) + "..." : item.id}</td>
                        <td>{item.phoneNo}</td>
                        <td>{item.batchNo}</td>
                        <td>{item.interval}</td>
                        <td>{item.endDate}</td>
                        <td>{item.nextDate}</td>
                      </tr>

                    </tbody>
                  )}

                </table>
              </div>

            </div>
          </>
      }
    </div >
  )
}

export default Notification;