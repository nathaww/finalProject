/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getStockCard } from '../../redux/medicine/action';
import Loading from '../../components/Loading';

const StockCard = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "LOADED"
    })
  }, [])

  let batchno, sdate, edate;

  const { stockcard, loading } = useSelector(state => state.medicines);

  const handleInputChange = (e) => {
    e.preventDefault();
    batchno = e.target.value;
    console.log(batchno);
  };
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
    dispatch(getStockCard(batchno, sdate, edate));
  };

  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>{loading ? "Loading..." : "Stock Card"}</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center mb-3">
        <button onClick={() => { nav('/DSS') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
      </div>

      <form onSubmit={handelSubmit}>
        <div className="flex flex-wrap lg:w-4/12 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="Batch Number"
              />
            </div>
            <TextInput
              id="title"
              type="text"
              sizing="md"
              onChange={handleInputChange}
            />
          </div>
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="Start Date"
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
                value="End Date"
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
              Generate Stock Card
            </button>
          </div>
        </div>
      </form>

      <div>
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
                        <th className="p-2 text-left">In Stock quantity</th>
                        <th className="p-2 text-left">Sold</th>
                      </tr>
                    </thead>
                    {stockcard && stockcard.map((item) =>
                      <tbody key={item.length}>
                        <tr>
                          <td>{item.batchNo}</td>
                          <td>{item.description}</td>
                          <td>{item.inStockQuantity}</td>
                          <td>{item.soldQuantity}</td>
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

export default StockCard