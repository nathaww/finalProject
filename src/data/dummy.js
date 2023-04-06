import React from 'react';
import { AiFillFile, AiFillBell } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { BiStats } from 'react-icons/bi';
import { CgPill } from 'react-icons/cg';
import { IoMdContacts, IoMdSettings } from 'react-icons/io';


export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Statistics',
        icon: <BiStats />,
      },
      {
        name: 'employees',
        icon: <IoMdContacts />,
      },
      {
        name: 'Notification',
        icon: <AiFillBell />,
      },
      {
        name: 'DSS',
        icon: <AiFillFile />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'Medicine',
        icon: <CgPill />,
      },
      {
        name: 'customers',
        icon: <FaUsers />,
      },
    ],
  },
  {
    title: 'Others',
    links: [
      {
        name: 'Settings',
        icon: <IoMdSettings />,
      },
    ],
  },
];
