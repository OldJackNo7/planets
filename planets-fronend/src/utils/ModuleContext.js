import React, {createContext, useReducer} from 'react';
import Captains from "../components/captains/Captains";

const ModuleContext = createContext({
    modulePath: [Captains],
    moduleProps: [{}]
});

const moduleReducer = (state, action) => {
    switch (action.type) {
        case 'back':
            const newModulePath = [...state.modulePath];
            const newModuleProps = [...state.moduleProps];
            newModulePath.pop();
            newModuleProps.pop();
            if (newModulePath.length === 0) {
                newModulePath.push(Captains);
            }
            if (newModuleProps.length === 0) {
                newModuleProps.push({});
            }
            return {
                modulePath: newModulePath,
                moduleProps: newModuleProps
            };
        case 'forward':
            return {
                modulePath: [...state.modulePath, action.module],
                moduleProps: [...state.modulePath, action.props]
            };
        case 'newNavigation':
            return {
                modulePath: [action.module],
                moduleProps: [action.props]
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

const ModuleProvider = ({children}) => {
    const [state, dispatch] = useReducer(moduleReducer, {
        modulePath: [Captains],
        moduleProps: [{}]
    });
    const value = {state, dispatch}
    return <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
}

function useModuleContext() {
    const context = React.useContext(ModuleContext)
    if (context === undefined) {
        throw new Error('useModuleContext must be used within a ModuleProvider')
    }
    return context
}

export {ModuleProvider, useModuleContext}