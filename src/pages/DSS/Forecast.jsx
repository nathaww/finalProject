/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { TextInput, Label } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Loading from '../../components/Loading';
import { getForecast } from '../../redux/medicine/action';

const Forecast = () => {

  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "LOADED"
    })
  }, [])

  const { forecast, loading } = useSelector(state => state.medicines);

  const [state, setState] = useState();

  const handleInputChange = (e) => {
    setState(e.target.value);
    console.log(state);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(getForecast(state));
  };


  return (
    <div className="mt-20 px-8">
      <p>Page</p>
      <p className='font-bold text-3xl'>Forecast</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-center mb-3">
        <button onClick={() => { nav('/DSS') }} className='btn border-0 inline-flex text-black bg-gradient-to-r from-sky-400 to-cyan-300'><BiArrowBack className='mx-1' />Back</button>
      </div>

      <form onSubmit={handelSubmit}>
        <div className="flex flex-wrap lg:w-4/12 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6">
          <div className="p-2 w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="small"
                value="Enter number of months you want to forcast"
              />
            </div>
            <TextInput
              id="title"
              type="number"
              sizing="md"
              addon="Month(s)"
              required="true"
              onChange={handleInputChange}
            />
          </div>
          <div className="mx-auto block">
            <button type='submit' className={`btn mt-3 mx-2 border-0 text-black bg-main-bg dark:bg-main-dark-bg dark:text-white dark:hover:bg-main-dark-bg hover:bg-white ${loading ? "loading" : ""}`}>
              Forecast
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
              <div className="flex flex-wrap lg:w-6/12 sm:mx-auto sm:mb-2 -mx-2 transition duration-500 bg-white dark:bg-secondary-dark-bg rounded-lg shadow-lg p-6 mt-5">
                <div className="overflow-auto lg:overflow-visible ">
                  {(() => {
                    if (!forecast) {
                      return (
                        <div className='flex justify-center mt-5'>
                          <p className='text-center text-xl'>Forecast will appear here</p>
                        </div>
                      )
                    } else {
                      return (
                        <div className='overflow-auto flex flex-row gap-5 justify-center px-3'>
                          <div>
                            <p className=''>Forecast for the next {forecast.anti_Fungal ? forecast.anti_Fungal.length : ""} month(s)</p>
                            <hr />
                            {forecast.anti_Fungal && forecast.anti_Fungal.map((item) => (
                              <>
                                <div className='flex justify-center' key={item.length}>
                                  <p>{Math.ceil(item)}</p>
                                </div>
                              </>
                            ))
                            }
                          </div>
                          <div>
                            <p className='font-bold'>Lowest</p>
                            <hr />
                            {forecast.anti_Fungal_LB && forecast.anti_Fungal_LB.map((item) => (
                              <>
                                <div key={item.length}>
                                  <p>{Math.ceil(item)}</p>
                                </div>
                              </>
                            ))
                            }
                          </div>
                          <div>
                            <p className='font-bold'>Highest</p>
                            <hr />
                            {forecast.anti_Fungal_UB && forecast.anti_Fungal_UB.map((item) => (
                              <>
                                <div key={item.length}>
                                  <p>{Math.ceil(item)}</p>
                                </div>
                              </>
                            ))
                            }
                          </div>
                        </div>

                      )
                    }
                  })()}
                </div>

              </div>
            </>
        }
      </div>
    </div>
  )
}

export default Forecast