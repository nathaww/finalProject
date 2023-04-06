import * as types from '../actionType'

const initialState = {
    medicines: [],
    medicine: {},
    forecast: {},
    ruc: [],
    profitloss: [],
    bincards: [],
    stockcard: {},
    sold: [],
    sell: [],
    token: {},
    ex1: [],
    ex6: [],
    loading: true,
}

const medReducer = (state = initialState, action) => {

    switch (action.type) {

        case "LOGIN":
            return {
                ...state,
                token: action.payload,
                loading: false,
            };
        case types.GET_MEDICINE:
        case "SEARCH_MEDICINES":
            return {
                ...state,
                medicines: action.payload,
                loading: false,
            };
        case "GET_STOCKCARDS":
            return {
                ...state,
                stockcard: action.payload,
                loading: false,
            };
        case "LOAD_PROFIT_LOSS":
        case "GET_PROFIT_LOSS":
            return {
                ...state,
                profitloss: action.payload,
                loading: false,
            };
        case "GET_BINCARDS":
            return {
                ...state,
                bincards: action.payload,
                loading: false,
            };
        case "GET_RUC": return {
            ...state,
            ruc: action.payload,
            loading: false,
        };
        case "GET_FORECAST":
            return {
                ...state,
                forecast: action.payload,
                loading: false,
            };
        case "GET_TRANSACTION":
            return {
                ...state,
                sell: action.payload,
                loading: false,
            };
        case "GET_SOLD":
            return {
                ...state,
                sold: action.payload,
                loading: false,
            };
        case "GET_EX1":
            return {
                ...state,
                ex1: action.payload,
                loading: false,
            };
        case "GET_EX6":
            return {
                ...state,
                ex6: action.payload,
                loading: false,
            };
        case "ADD_MEDICINE":
        case types.DELETE_MEDICINE:
        case types.UPDATE_MEDICINE:
            return {
                ...state,
                loading: false,
            };

        case types.GET_SINGLE_MEDICINE:
            return {
                ...state,
                medicine: action.payload,
                loading: false,
            };
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
        case "LOADED":
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default medReducer;