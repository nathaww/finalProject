import axios from 'axios';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"



let medToken = localStorage.getItem('Med-token');

export const loadCustomers = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/Customers/all',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "GET_CUSTOMER",
                payload: resp.data,
            });
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const deleteCustomer = (id) => {

    return async function (dispatch) {
        dispatch({
            type: "LOADING",
        });
        await axios.delete(`https://localhost:7105/api/Customers/${id}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {

            console.log("resp", resp)
            dispatch({
                type: "DELETE_CUSTOMER"
            });
            dispatch(loadCustomers());
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED",
        });
    };
};

export const addCustomer = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.post(`https://localhost:7105/api/Customers/add`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "ADD_CUSTOMER",
            });
            dispatch(loadCustomers());
            Toastify({
                text: "Customer Added!",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                },
            }).showToast();
        }).catch(err => {
            console.log(err)
            console.log(err.response.data)
            Toastify({
                text: "Failed to upload",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                },
            }).showToast();
        });
        dispatch({
            type: "LOADED"
        });
    };
};


export const getSingleCustomer = (id) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/Customers/${id}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch(
                {
                    type: "GET_SINGLE_CUSTOMER",
                    payload: resp.data,
                }
            );
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const updateCustomer = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.put(`https://localhost:7105/api/Customers/update`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "UPDATE_CUSTOMER",
            });
            Toastify({
                text: "Customer Information Updated!",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                },
            }).showToast();

        }).catch((error) => {
            console.log(error)
            Toastify({
                text: "Failed to update",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                },
            }).showToast();
        });
        dispatch({
            type: "LOADED",
        });

    };
};

