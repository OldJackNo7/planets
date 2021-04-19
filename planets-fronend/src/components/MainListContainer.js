import React from 'react';
import MenuBar from "./MenuBar";
import {useModuleContext} from "../utils/ModuleContext";

const MainListContainer = () => {
    const {state: {modulePath, moduleProps}} = useModuleContext();
    const CurrentModule = modulePath[modulePath.length - 1];
    return (
        <>
            <MenuBar/>
            <CurrentModule {...moduleProps[moduleProps.length - 1]}/>
        </>
    )
}

export default MainListContainer;