const initialState = {
    customers: [],
    customer: {},
    token: {},
    loading: true,
}

const customerReducer = (state = initialState, action) => {

    switch (action.type) {

        case "GET_CUSTOMER":
            return {
                ...state,
                customers: action.payload,
                loading: false,
            };
        case "ADD_CUSTOMER":
        case "DELETE_CUSTOMER":
        case "UPDATE_CUSTOMER":
            return {
                ...state,
                loading: false,
            };

        case "GET_SINGLE_CUSTOMER":
            return {
                ...state,
                customer: action.payload,
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

export default customerReducer;