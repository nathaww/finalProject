/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { FaAlignLeft } from 'react-icons/fa'
import { BsFillSunFill } from 'react-icons/bs'
import { Tooltip } from 'flowbite-react'
import { useStateContext } from '../contexts/ContexProvider'
import { Offline, Online } from "react-detect-offline"

const NavButton = ({ title, customFunction, icon, color, dotColor }) => (
  <Tooltip content={title} placement='bottom'>
    <button onClick={customFunction} className='relative text-xl text-blue blue rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'></span>
      {icon}
    </button>
  </Tooltip>
)

const Navbar = () => {

  const { setActiveMenu, screenSize, setscreenSize } = useStateContext();


  useEffect(() => {
    const handleResize = () => setscreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize)
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (

    <div className='flex flex-auto bg-white dark:bg-secondary-dark-bg rounded justify-between p-2'>
      <NavButton title="Menu" customFunction={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} icon={<FaAlignLeft />} />
      <Offline>Offline</Offline>
      <Online>Connected</Online>
      <div>
        <p className="inline-flex mx-3">Good Morning<BsFillSunFill className='m-1.5' /> </p>

      </div>
    </div>

  )
}

export default Navbar