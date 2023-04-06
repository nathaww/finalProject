/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContexProvider';
import { Modal, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthUser } from 'react-auth-kit';
import { changePassword } from '../redux/employee/employeeAction';

const Settings = () => {

  const { setMode, currentMode } = useStateContext();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "LOADED",
    });
  }, [])

  const auth = useAuthUser();

  const { loading } = useSelector(state => state.employees);

  const [state, setState] = useState({
    userName: (auth() ? auth().email : ""),
    oldPassword: "",
    newPassword: "",
  });

  const [Error, setError] = useState();
  const [pop, setpop] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setpop(true);
  };

  const onClose = (e) => {
    e.preventDefault();
    setpop(false);
  };

  let { userName, oldPassword, newPassword } = state;

  const handleInputChange = (e) => {
    console.log(state);
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!userName || !oldPassword || !newPassword) {
      setError("Empty field(s)! Please check for empty field(s) and try again.")
    } else {
      dispatch(changePassword(state));
      setError("");
    }
  };


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>{loading ? "Loading..." : "Settings"}</p>
      <div className='mx-auto w-96 bg-main-bg dark:bg-main-dark-bg'>
        <div className="dropdown dropdown-top justify-center flex">
          <label tabIndex="0" className="btn m-1 border-0 shadow-lg bg-white dark:bg-secondary-dark-bg hover:bg-white dark:hover:text-white">Select Theme</label>
          <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white dark:bg-secondary-dark-bg rounded-box w-52">
            <li>
              <div className='inline-flex'>
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value="Light"
                  className="cursor-pointer radio"
                  onChange={setMode}
                  checked={currentMode === 'Light'} />
                Light
              </div>
            </li>
            <li>
              <div className='inline-flex'>
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value="Dark"
                  onChange={setMode}
                  className="cursor-pointer radio"
                  checked={currentMode === 'Dark'} />
                Dark
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="card w-96 dark:bg-base-100 shadow-xl bg-white">
            <div className="p-6">
            
              <div className="flex justify-center my-2">
                <button className="btn bg-gradient-to-r from-sky-400 to-cyan-300 border-0 text-white"
                  onClick={onClick}>
                  Change Password
                </button>
                <Modal show={pop} size="md" popup={true} onClose={onClose}>
                  <div className="text-center bg-secondary-dark-bg py-5 border-1 border-slate-900 px-5 rounded-md">
                    <h3 className="mb-5 text-lg font-normal text-gray-400">
                      Change Password
                    </h3>

                    <p className='mt-3 text-left mb-2'>Old Password</p>
                    <TextInput
                      className="mx-4"
                      name='oldPassword'
                      value={oldPassword || ""}
                      onChange={handleInputChange}
                      type="password" />

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
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings