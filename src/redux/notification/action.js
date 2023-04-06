import axios from 'axios';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

let medToken = localStorage.getItem('Med-token');


export const loadNotifications = () => {
    return async function (dispatch) {
        await axios.get('https://localhost:7105/api/CustomerNotifications',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "GET_NOTIFICATION",
                    payload: resp.data,
                });
            }).catch(error => console.log(error));

    };
};


export const sendAllNotifications = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/CustomerNotifications/sendtoall',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "SEND_ALL_NOTIFICATIONS",
                })
                dispatch(loadNotifications());
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const searchNotification = (phrase) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/CustomerNotifications/phrase/${phrase}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_NOTIFICATION',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};


export const deleteNotification = (id) => {

    return function (dispatch) {
        axios.delete(`https://localhost:7105/api/CustomerNotifications/${id}`, {
        }).then((resp) => {

            console.log("resp", resp)
            dispatch({
                type: "DELETE_NOTIFICATION",
            });
            dispatch(loadNotifications());
        }).catch(error => console.log(error))
    };
};

export const addNotification = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.post(`https://localhost:7105/api/CustomerNotifications`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "ADD_NOTIFICATION",
            });
            dispatch(loadNotifications());
            Toastify({
                text: "Notification added!",
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
                text: "Failed to add!",
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


export const getSingleNotification = (id) => {
    return function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        axios.get(`https://localhost:7105/api/CustomerNotifications/${id}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "GET_SINGLE_NOTIFICATION",
                payload: resp.data,
            });
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const updateNotification = (data, id) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.put(`https://localhost:7105/api/CustomerNotifications/id/${id}`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "UPDATE_NOTIFICATION",
            });
            Toastify({
                text: "Notification updated!",
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
                text: "Failed to add!",
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
