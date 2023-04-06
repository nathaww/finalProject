const initialState = {
    employees: [],
    employee: {},
    token: {},
    loading: true,
}

const employeeReducer = (state = initialState, action) => {

    switch (action.type) {

        case "GET_EMPLOYEE":
            return {
                ...state,
                employees: action.payload,
                loading: false,
            };
        case "ADD_EMPLOYEE":
        case "DELETE_EMPLOYEE":
        case "CHANGE_PASSWORD":
            return {
                ...state,
                loading: false,
            };

        case "GET_SINGLE_EMPLOYEE":
            return {
                ...state,
                employee: action.payload,
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

export default employeeReducer;