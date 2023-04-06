import * as types from '../actionType';
import axios from 'axios';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


let medToken = localStorage.getItem('Med-token');

const getMedicine = (medicines) => ({
    type: types.GET_MEDICINE,
    payload: medicines,
});

const medicineDeleted = () => ({
    type: types.DELETE_MEDICINE,
});

const medicineUpdated = () => ({
    type: types.UPDATE_MEDICINE,
});

const getSingleMedicine = (medicine) => ({
    type: types.GET_SINGLE_MEDICINE,
    payload: medicine,
});


export const loadMedicines = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/Medicines/all',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }
        ).then((resp) => {
            console.log("resp", resp)
            dispatch(getMedicine(resp.data));
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const searchMedicines = (phrase) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/Medicines/phrase/${phrase}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "SEARCH_MEDICINES",
                payload: resp.data,
            });
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const deleteMedicine = (data, id) => {

    return function (dispatch) {
        axios.put(`https://localhost:7105/api/Medicines/remove`,
            { "id": id, "quantity": data.quantity, "dateReceived": data.dateReceived, "invoice": data.invoice },
            {
                headers: { Authorization: `Bearer ${medToken}` },
            }).then((resp) => {
                console.log("resp", resp)
                dispatch(medicineDeleted());
                dispatch(loadMedicines());
                Toastify({
                    text: "Item(s) deleted!",
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
                    text: "Failed to delete!",
                    duration: 5000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                    },
                }).showToast();
            })
    };
};


export const sellMedicine = (data, id) => {

    return function (dispatch) {
        axios.post(`https://localhost:7105/api/SoldMedicines/Sell`,

            {
                "medicineID": id, "quantity": data.quantity, "pharmacistId": localStorage.getItem("user"), "customerPhone": data.customerPhone,
                "sellingDate": data.sellingDate, "interval": data.interval, "endDate": data.endDate,
            },
            {
                headers: { Authorization: `Bearer ${medToken}` },
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "GET_TRANSACTION",
                    payload: resp.data,
                });
                dispatch(loadMedicines());
                Toastify({
                    text: "Item(s) sold!",
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
                    text: "Failed to sell!",
                    duration: 5000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                    },
                }).showToast();
            })
    };
};

export const addMedicine = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.post(`https://localhost:7105/api/Medicines/add`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch({
                type: "ADD_MEDICINE"
            });
            dispatch(loadMedicines());
            Toastify({
                text: "Medicine added!",
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
                text: "Failed to upload!",
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


export const getSingleMed = (id) => {
    return function (dispatch) {
        axios.get(`https://localhost:7105/api/Medicines/${id}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch(getSingleMedicine(resp.data));
        }).catch(error => console.log(error))
    };
};

export const updateMedicine = (data, id) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.put(`https://localhost:7105/api/Medicines/updateDetails`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch(medicineUpdated());
            Toastify({
                text: "Medicine Updated!",
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
                text: "Failed to update!",
                duration: 5000,
                gravity: "top",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #3D9CCA, #5EBACB)",
                },
            }).showToast();
        })
        dispatch({
            type: "LOADED",
        });
    };
};

export const updateQuantity = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.put(`https://localhost:7105/api/Medicines/updateQuantity`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch(medicineUpdated());
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED",
        });
    };
};

export const addQuantity = (data) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.put(`https://localhost:7105/api/Medicines/addQuantity`, data,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            },
        ).then((resp) => {
            console.log("resp", resp)
            dispatch(medicineUpdated());
        }).catch(error => console.log(error));
        dispatch({
            type: "LOADED",
        });
    };
};

export const soldMedicines = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/SoldMedicines',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "GET_SOLD",
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const expiresin1 = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/Medicines/toBeExpiredInOneMonth',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "GET_EX1",
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const expiresin6 = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/Medicines/toBeExpiredInSixMonth',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "GET_EX6",
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
}

export const searchSoldMedicines = (phrase) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/SoldMedicines/phrase/klhk${phrase}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: "GET_SOLD",
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const loadRUC = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING",
        });
        await axios.get('https://localhost:7105/api/Dss/FullRUCRecords',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch(
                    {
                        type: 'GET_RUC',
                        payload: resp.data,
                    }
                );
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED",
        });
    };
};

export const loadProfitLoss = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/Dss/profitloss',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'LOAD_PROFIT_LOSS',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const getProfitLoss = (sdate, edate) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/Dss/profitlossbydate?StartDate=${sdate}&EndDate=${edate}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_PROFIT_LOSS',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const getForecast = (months) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/Dss/forecast?horizon=${months}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_FORECAST',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const loadBinCard = () => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get('https://localhost:7105/api/BinCards',
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_BINCARDS',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const searchBinCard = (phrase) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/BinCards/phrase/${phrase}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_BINCARDS',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const getBinCard = (BatchNo, sdate, edate) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/BinCards/byDate?BatchNo=${BatchNo}&StartDate=${sdate}&EndDate=${edate}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_BINCARDS',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const getStockCard = (BatchNo, sdate, edate) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/Dss/generateStockCard?BatchNo=${BatchNo}&StartDate=${sdate}&EndDate=${edate}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_STOCKCARDS',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};

export const getMostSold = (sdate, edate) => {
    return async function (dispatch) {
        dispatch({
            type: "LOADING"
        });
        await axios.get(`https://localhost:7105/api/Dss/mostSoldMedicine?StartDate=${sdate}&EndDate=${edate}`,
            {
                headers: { Authorization: `Bearer ${medToken}` }
            }).then((resp) => {
                console.log("resp", resp)
                dispatch({
                    type: 'GET_SOLD',
                    payload: resp.data,
                });
            }).catch(error => console.log(error));
        dispatch({
            type: "LOADED"
        });
    };
};
