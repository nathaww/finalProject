/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { loadRUC } from '../../redux/medicine/action';

const RUC = () => {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'LOADED',
        })
    }, []);

    const { ruc, loading } = useSelector(state => state.medicines);

    useEffect(() => {
        dispatch(loadRUC());
    }, []);

    return (
        <div className="mt-20 px-8">
            <p>Page</p>
            <p className='font-bold text-3xl'>RUC</p>
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
                                            <th className="px-2 py-3">Invoice</th>
                                            <th className="p-2 text-left">Batch Number</th>
                                            <th className="p-2 text-left">Date Recieved</th>
                                            <th className="p-2 text-left">Amount</th>
                                            <th className="p-2 text-left">Description</th>
                                            <th className="p-2 text-left">Expire Date</th>
                                            <th className="p-2 text-left">Category</th>
                                            <th className="p-2 text-left">Type</th>
                                        </tr>
                                    </thead>
                                    {ruc && ruc.map((item) =>
                                        <tbody key={item.id}>
                                            <tr>
                                                <td>{item.invoice}</td>
                                                <td>{item.batchNo}</td>
                                                <td>{item.dateReceived}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.description}</td>
                                                <td>{item.expireDate}</td>
                                                <td>{item.category?.length > 9 ? item.category.substr(0, 15 - 1) + "..." : item.category}</td>
                                                <td>{item.type}</td>
                                            </tr>

                                        </tbody>
                                    )}

                                </table>
                            </div>

                        </div>
                    </>
            }
        </div>
    )
}

export default RUC