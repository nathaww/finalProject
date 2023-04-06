import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setisClicked] = useState(initialState);
    const [screenSize, setscreenSize] = useState(undefined);
    const [currentMode, setCurrentMode] = useState('Light');

    const handleClick = (clicked) => {
        setisClicked({ ...initialState, [clicked]: true });
    }

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        localStorage.setItem('theme', e.target.value.toLowerCase());
    };

    return (
        <StateContext.Provider value={{
            activeMenu, setActiveMenu, isClicked, setisClicked,
            handleClick, screenSize, setscreenSize, setMode, currentMode, setCurrentMode
        }}>
            {children}
        </StateContext.Provider>)
}

export const useStateContext = () => useContext(StateContext);