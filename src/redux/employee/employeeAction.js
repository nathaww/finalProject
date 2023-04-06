import axios from 'axios';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"



let medToken = localStorage.getItem('Med-token');

export const loadEmployees = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/Account/all',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "GET_EMPLOYEE",
                payload: resp.data,
            });
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const deleteEmployee = (id) => {

    return async function (dispatch) {
        dispatch({
            type: "LOADING",
        });
        await axios.delete(`https://localhost:7105/api/Customers/${id}`, {
        }).then((resp) => {

            console.log("resp", resp)
            dispatch({
                type: "DELETE_CUSTOMER"
            });
            dispatch(loadEmployees());
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED",
        });
    };
};

export const addEmployee = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.post(`https://localhost:7105/api/Account/register`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "ADD_EMPLOYEE",
            });
            dispatch(loadEmployees());
            Toastify({
                text: "Account Created!",
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
        })
        dispatch({
            type: "LOADED"
        });
    };
};


export const getSingleEmployee = (id) => {
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

export const changePassword = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.post(`https://localhost:7105/api/Account/changepassword`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "CHANGE_PASSWORD",
            });
            Toastify({
                text: "Password Changed!",
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

export const changePasswordAdmin = (data, un) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.post(`https://localhost:7105/api/Account/updatePassword`, { "userName": un, "newPassword": data.newPassword },
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "CHANGE_PASSWORD",
            });
            Toastify({
                text: "Password Changed!",
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
