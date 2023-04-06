/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Sidebar } from './components'
import { Employees, Customers, Statistics, Medicine, Notifications } from './pages';
import { useStateContext } from './contexts/ContexProvider';
import Settings from './pages/Settings';
import Edit from './pages/Med/Edit'
import Add from './pages/Med/Add';
import DSS from './pages/DSS/DSS';
import AddCustomer from './pages/Customer/Add';
import EditCustomer from './pages/Customer/Edit';
import AddEmployee from './pages/Employee/Add';
import EditEmployee from './pages/Employee/Edit';
import RUC from './pages/DSS/RUC';
import ProfitLoss from './pages/DSS/ProfitLoss';
import Bincard from './pages/DSS/BinCard';
import StockCard from './pages/DSS/StockCard';
import Forecast from './pages/DSS/Forecast';
import MostSold from './pages/DSS/MostSold';
import Notification from './pages/Notification/Notification';
import EditQuantity from './pages/Med/EditQuantity';
import AddQuantity from './pages/Med/AddQuantity';
import SoldMedicine from './pages/Med/SoldMedicines';
import Delete from './pages/Med/Delete';
import Sell from './pages/Med/Sell';
import Checkout from './pages/Med/Checkout';
import ExpiredIn1Month from './pages/Med/ExpiredIn1';
import ExpiredIn6Month from './pages/Med/ExpiredIn6';


const App = () => {
  const { activeMenu, currentMode, setCurrentMode } = useStateContext();

  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>

      <div className='flex relative dark:bg-main-dark-bg'>
        {activeMenu ? (<div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
          <Sidebar />
        </div>) : (<div className='w-0 dark:bg-secondary-dark-bg'>
          <Sidebar />
        </div>)}
        <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
            <Navbar />
          </div>

          <div>
            <Routes>
              {/* dashboard  */}
              <Route path="*" element={<p></p>} />
              <Route path="/Statistics" element={(<Statistics />)} />

              <Route path="/Customers" element={<Customers />} />
              <Route path="/customers/add" element={<AddCustomer />} />
              <Route path="/customers/edit/:id" element={<EditCustomer />} />

              <Route path="/dss" element={<DSS />} />
              <Route path="/dss/ruc" element={<RUC />} />
              <Route path="/dss/profitloss" element={<ProfitLoss />} />
              <Route path="/dss/stockcard" element={<StockCard />} />
              <Route path="/dss/bincard" element={<Bincard />} />
              <Route path="/dss/forecast" element={<Forecast />} />
              <Route path="/dss/mostsold" element={<MostSold />} />
              <Route path="/notification" element={<Notification />} />

              {/* pages  */}
              <Route path="/Medicine" element={<Medicine />} />
              <Route path="/Medicine/add" element={<Add />} />
              <Route path="/Medicine/edit/:id" element={<Edit />} />
              <Route path="/Medicine/delete/:id" element={<Delete />} />
              <Route path="/Medicine/sell/:id" element={<Sell />} />
              <Route path="/Medicine/checkout" element={<Checkout />} />
              <Route path="/Medicine/expiresin1" element={<ExpiredIn1Month />} />
              <Route path="/Medicine/expiresin6" element={<ExpiredIn6Month />} />


              <Route path="/Medicine/edit/qunatity" element={<EditQuantity />} />
              <Route path="/Medicine/add/qunatity" element={<AddQuantity />} />
              <Route path="/Medicine/soldmedicines/" element={<SoldMedicine />} />

              <Route path="/Employees" element={<Employees />} />
              <Route path="/employees/add" element={<AddEmployee />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />

              {/* Others  */}
              <Route path="/Settings" element={<Settings />} />
              <Route path="/notification" element={<Notifications />} />

            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
