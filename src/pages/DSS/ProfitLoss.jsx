/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { Label, TextInput } from 'flowbite-react';
import { getProfitLoss, loadProfitLoss } from '../../redux/medicine/action';

const ProfitLoss = () => {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'LOADED',
    })
  }, []);

  const { profitloss, loading } = useSelector(state => state.medicines);

  useEffect(() => {
    dispatch(loadProfitLoss());
  }, []);

  let sdate, edate;
  const handleInputChange2 = (e) => {
    e.preventDefault();
    sdate = e.target.value;
    console.log(sdate);
  };
  const handleInputChange3 = (e) => {
    e.preventDefault();
    edate = e.target.value;
    console.log(edate);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(getProfitLoss(sdate, edate));
  };

  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Profit/Loss</p>
      <form onSubmit={handelSubmit}>
        <div className="flex flex-wrap lg:w-4/12 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-4">
          <p className='text-sm mx-auto'>Get Profit/Loss by Date</p>
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="From"
              />
            </div>
            <TextInput
              id="title"
              type="date"
              sizing="md"
              onChange={handleInputChange2}
            />
          </div>
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="To"
              />
            </div>
            <TextInput
              id="title"
              type="date"
              sizing="md"
              onChange={handleInputChange3}
            />
          </div>

          <div className="mx-auto block">
            <button type='submit' className={`btn mt-3 mx-2 border-0 text-black bg-main-bg dark:bg-main-dark-bg dark:text-white dark:hover:bg-main-dark-bg hover:bg-white ${loading ? "loading" : ""}`}>
              Get
            </button>
          </div>
        </div>
      </form>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
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
                        <th className="px-2 py-3">Batch Number</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Sold</th>
                        <th className="p-2 text-left">Selling</th>
                        <th className="p-2 text-left">Cost</th>
                        <th className="p-2 text-left">Damaged</th>
                        <th className="p-2 text-left">Profit</th>
                      </tr>
                    </thead>
                    {profitloss && profitloss.map((item, index) =>
                      <tbody key={index}>
                        <tr>
                          <td>{item.batchNo}</td>
                          <td>{item.description}</td>
                          <td>{item.soldQuantity}</td>
                          <td>{item.sellingPrice}</td>
                          <td>{item.medicineCost}</td>
                          <td>{item.damaged}</td>
                          <td>{item.profit}</td>
                        </tr>
                      </tbody>
                    )}

                  </table>
                </div>

              </div>
            </>
        }
      </div>
    </div>
  )
}

export default ProfitLoss