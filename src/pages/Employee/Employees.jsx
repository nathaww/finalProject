/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { changePasswordAdmin, loadEmployees } from '../../redux/employee/employeeAction';
import { Modal, TextInput } from 'flowbite-react';

const Employees = () => {

  const nav = useNavigate();
  let dispatch = useDispatch();
  const [Error, setError] = useState();
  const [pop, setpop] = useState(false);
  const [username, setusername] = useState();
  const { employees, loading } = useSelector(state => state.employees);
  const [state, setState] = useState({
    userName: "",
    newPassword: "",
  });

  useEffect(() => {
    dispatch(loadEmployees());
  }, []);




  const onClose = (e) => {
    e.preventDefault();
    setpop(false);
  };

  let { newPassword } = state;

  const handleInputChange = (e) => {
    console.log(state);
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!username || !newPassword) {
      setError("Empty field(s)! Please check for empty field(s) and try again.")
    } else {
      dispatch(changePasswordAdmin(state, username));
      setError("");
    }
  };



  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Employees</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <button onClick={() => { nav('/employees/add') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiAddToQueue className='mx-2' />Add Employees</button>
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
                    <th className="px-2 py-3">User Name</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Phone Number</th>
                    <th className="p-2 text-center">E-Mail</th>
                    <th className="p-2 text-center">Action</th>

                  </tr>
                </thead>
                {employees && employees.map((item) =>
                  <tbody key={item.id}>
                    <tr>
                      <td>{item.userName}</td>
                      <td>{item.name}</td>
                      <td>{item.role}</td>
                      <td>{item.phoneNo}</td>
                      <td>{item.email}</td>
                      <td>
                        <button className="btn  text-white"
                          onClick={
                            () => {
                              setpop(true);
                              setusername(item.userName);
                            }
                          }>
                          Change Password
                        </button>
                        <Modal show={pop} size="md" popup={true} onClose={onClose}>
                          <div className="text-center bg-secondary-dark-bg py-5 border-1 border-slate-900 px-5 rounded-md">
                            <h3 className="mb-5 text-lg font-normal text-gray-400">
                              Change Password
                            </h3>
                            <p className='mt-3 text-left mb-2'>New Password</p>
                            <TextInput className="mx-4"
                              name='newPassword'
                              value={newPassword || ""}
                              onChange={handleInputChange}
                              type="password" />

                            <p className='text-red-600 text-center'>{Error}</p>

                            <div className="flex justify-center gap-4">
                              <button onClick={handleUpload} className={`btn mt-2 ${loading ? "loading" : ""}`}>
                                Change
                              </button>
                              <button className='btn mt-2' onClick={onClose}>
                                Done
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </td>
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

export default Employees