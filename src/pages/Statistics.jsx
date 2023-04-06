import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Statistics = () => {

  const data = [
    // 'Anti-Respiratory', 'Narcotic and Anti-Psychotropic', 'Anti-Biotic', 'Vitamins and Minerals', 'CSV Drugs'
    {
      name: 'Anti-Fungal',
      profit: 4000,
      loss: 2400,
      amt: 2400,
    },
    {
      name: 'Anti-Allergy',
      profit: 3000,
      loss: 1398,
      amt: 2210,
    },
    {
      name: 'Anti-Helmentic',
      profit: 2000,
      loss: 9800,
      amt: 2290,
    },
    {
      name: 'Hormonal Drugs',
      profit: 2780,
      loss: 3908,
      amt: 2000,
    },
    {
      name: 'ENT Drugs',
      profit: 1890,
      loss: 4800,
      amt: 2181,
    },
    {
      name: 'NSAI',
      profit: 2390,
      loss: 3800,
      amt: 2500,
    },
    {
      name: 'GIT',
      profit: 3490,
      loss: 4300,
      amt: 2100,
    },
  ];



  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold mb-3 text-3xl'>Statistics</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center mb-4">
        <div className="stats bg-secondary-dark-bg text-primary-content">

          <div className="stat">
            <div className="stat-title">Account balance</div>
            <div className="stat-value">$89,400</div>
            <div className="stat-actions">
              <button className="btn btn-sm btn-success">Add funds</button>
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Current balance</div>
            <div className="stat-value">$89,400</div>
            <div className="stat-actions">
              <button className="btn btn-sm">Withdrawal</button>
              <button className="btn btn-sm">deposit</button>
            </div>
          </div>

        </div>


      </div>

      <div>


        <div className='flex overflow-auto justify-center'>
          <BarChart className='w-36'
            width={1000}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="loss" fill="#3D9CCA" />
            <Bar dataKey="profit" fill="#5EBACB" />
          </BarChart>
        </div>


        <div className='flex overflow-auto justify-center'>
          <BarChart className='w-36'
            width={1000}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="loss" fill="#3D9CCA" />
            <Bar dataKey="profit" fill="#5EBACB" />
          </BarChart>
        </div>


        <div className='flex justify-center overflow-auto'>
          <BarChart
            width={1000}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="loss" stackId="a" fill="#8884d8" />
            <Bar dataKey="profit" stackId="a" fill="#82ca9d" />
          </BarChart>
        </div>


      </div>

    </div >
  )
}

export default Statistics