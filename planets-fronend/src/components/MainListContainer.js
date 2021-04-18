import React, {useState} from 'react';
import MenuBar from "./MenuBar";
import {PLANETS_MODULE} from "../utils/constants";
import Captains from "./Captains";
import Planets from "./Planets";

const MainListContainer = (props) => {
    const [selectedModule, setSelectedModule] = useState(PLANETS_MODULE);

    const moduleToRender = selectedModule === PLANETS_MODULE ? <Planets/> : <Captains/>
    return (
        <>
            <MenuBar selectModule={setSelectedModule}/>
            {moduleToRender}
        </>
    )
}

export default MainListContainer;