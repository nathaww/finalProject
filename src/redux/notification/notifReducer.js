
const initialState = {
    notifications: [],
    notification: {},
    token: {},
    loading: true,
}

const notifReducer = (state = initialState, action) => {

    switch (action.type) {

        case "GET_NOTIFICATION":
            return {
                ...state,
                notifications: action.payload,
                loading: false,
            };
        case "ADD_NOTIFICATION":
        case "DELETE_NOTIFICATION":
        case "UPDATE_NOTIFICATION":
        case "SEND_ALL_NOTIFICATIONS":
            return {
                ...state,
                loading: false,
            };

        case "GET_SINGLE_NOTIFICATION":
            return {
                ...state,
                notification: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default notifReducer;