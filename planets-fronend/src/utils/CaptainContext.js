import React, {createContext, useReducer} from 'react';

const CaptainContext = createContext();

const captainReducer = (state, action) => {
    switch (action.type) {
        case 'changeCaptain':
            return {captain: action.captain}
        case 'unsetCaptain':
            return {captain: null}
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const CaptainProvider = ({children}) => {
    const [state, dispatch] = useReducer(captainReducer, {captain: null});
    const value = {state, dispatch}
    return <CaptainContext.Provider value={value}>{children}</CaptainContext.Provider>
}

function useCaptain() {
    const context = React.useContext(CaptainContext)
    if (context === undefined) {
        throw new Error('useCaptain must be used within a CaptainProvider')
    }
    return context
}

export {CaptainProvider, useCaptain}