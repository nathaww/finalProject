import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MdLocalPharmacy } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosArrowUp } from 'react-icons/io'
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContexProvider';
import { useSignOut, useAuthUser } from 'react-auth-kit';

const Sidebar = () => {

  let role;

  if (localStorage.getItem('Med-Role')) {
    role = localStorage.getItem('Med-Role');
    console.log(role);
  }

  useEffect(() => {
    if (role === "manager") {
      setlink(links);
    }
    else if (role === "pharmacist") {
      setlink(links.filter((item) => item.title !== "Dashboard"));
    }
    else {
      setlink(links.filter((item) => item.title !== "Dashboard" && item.title !== "Pages" && item.title !== "Others"));
    }
  }, [role]);

  const navigate = useNavigate();
  const signOut = useSignOut();
  const auth = useAuthUser();

  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const [link, setlink] = useState(links);



  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    signOut();
    localStorage.removeItem('Med-token');
    localStorage.removeItem('Med-Role');
    navigate('/login')
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-gradient-to-r from-sky-400 to-cyan-300';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';


  return (
    <div className='pl-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-lg'>
      {activeMenu && (<>
        <div className='flex justify-between items-center'>
          <Link to='/' onClick={handleCloseSideBar} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'><MdLocalPharmacy /><span>Lemlem Pharmacy.</span></Link>

        </div>
        <div className='mt-10'>
          {link.map((item) => (
            <div key={item.title}>
              <p className='text-gray-400 m-3 mt-4 uppercase'>
                {item.title}
              </p>
              {item.links.map((links) => (
                <NavLink to={`/${links.name}`} key={links.name} onClick={handleCloseSideBar} className={({ isActive }) => isActive ? activeLink : normalLink}>
                  {links.icon}
                  <span className='capitalize'>{links.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
          <div className=' w-[90%] gap-1 bg-main-bg dark:bg-main-dark-bg rounded-lg absolute bottom-2 flex justify-center'>
            <div className="dropdown dropdown-top">
              <label tabIndex="0" className="btn m-1 border-0 shadow-lg bg-white dark:bg-secondary-dark-bg hover:bg-white dark:hover:text-white"><FaUserAlt className='mx-3' />{(auth() ? auth().email : "") + ", " + (localStorage.getItem("Med-Role") ? localStorage.getItem("Med-Role").toUpperCase() : "")}<IoIosArrowUp className='mx-3' /></label>
              <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-white dark:bg-main-dark-bg rounded-box w-52">
                <li>
                  <button onClick={logout}>
                    Signout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>)
      }
    </div >
  )
}

export default Sidebar 