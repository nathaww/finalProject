import { combineReducers } from 'redux';
import customerReducer from './customer/customerReducer';
import employeeReducer from './employee/employeeReducer';
import medReducer from './medicine/medReducer';
import notifReducer from './notification/notifReducer';

const rootReducer = combineReducers({
    medicines: medReducer,
    customers: customerReducer,
    employees: employeeReducer,
    notifications: notifReducer,
});

export default rootReducer; 