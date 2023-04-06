import React from 'react'
import { useNavigate } from 'react-router-dom'

const DSS = () => {

    const navigate = useNavigate();
    return (
        <div className="mt-24 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>DSS</p>
            <div className="flex flex-wrap lg:flex-nowrap justify-center mt-5">
                <div className="flex w-full my-3">
                    <div className=" btn bg-white dark:bg-secondary-dark-bg grid h-20 w-40 flex-grow card rounded-box place-items-center" onClick={() => { navigate('/dss/bincard') }}>Bin Card</div>
                    <div className="divider divider-horizontal"></div>
                    <div className=" btn bg-white dark:bg-secondary-dark-bg grid h-20 w-40 flex-grow card rounded-box place-items-center" onClick={() => { navigate('/dss/stockcard') }}>Stock Card</div>
                </div>
            </div>
            <div className="flex w-full my-3">
                <div className="btn bg-white dark:bg-secondary-dark-bg grid h-20 w-40 flex-grow card rounded-box place-items-center" onClick={() => { navigate('/DSS/profitloss') }}>Profit/Loss</div>
                <div className="divider divider-horizontal"></div>
                <div className="btn bg-white dark:bg-secondary-dark-bg grid h-20 w-40 flex-grow card rounded-box place-items-center" onClick={() => { navigate('/dss/ruc') }}>RUC</div>
            </div>
            <div className="flex w-full my-3">
                <div className="btn bg-white dark:bg-secondary-dark-bg grid h-20 w-40 flex-grow card rounded-box place-items-center" onClick={() => { navigate('/DSS/forecast') }}>Sales Forecast</div>
                <div className="divider divider-horizontal"></div>
                <div className="btn bg-white dark:bg-secondary-dark-bg grid h-20 w-40 flex-grow card rounded-box place-items-center" onClick={() => { navigate('/dss/mostsold') }}>Most Sold Medicine</div>
            </div>
        </div>
    )
}

export default DSS