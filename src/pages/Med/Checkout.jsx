import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const Checkout = () => {
  const nav = useNavigate();

  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Paypal Checkout</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center my-5">
        <button onClick={() => { nav('/Medicine') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
      </div>
      <div className='flex justify-center'>
        <PayPalScriptProvider options={{ "client-id": "test" }}>
          <PayPalButtons />
        </PayPalScriptProvider>
      </div>
    </div>
  )
}

export default Checkout