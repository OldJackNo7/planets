import React, {useState} from 'react';
import MenuBar from "./MenuBar";
import {CAPTAINS_MODULE, PLANETS_MODULE} from "../utils/constants";
import Captains from "./Captains";
import Planets from "./Planets";
import {CaptainProvider} from "../utils/CaptainContext";

const MainListContainer = (props) => {
    const [selectedModule, setSelectedModule] = useState(CAPTAINS_MODULE);

    const moduleToRender = selectedModule === PLANETS_MODULE ? <Planets/> : <Captains/>
    return (
        <CaptainProvider>
            <MenuBar selectModule={setSelectedModule}/>
            {moduleToRender}
        </CaptainProvider>
    )
}

export default MainListContainer;