import React from 'react';
import {Box} from "@material-ui/core";
import {getPlanetIcon} from "../utils/utils";

const Planets = (props) => {

    return (
        <Box>
            <img src={getPlanetIcon("earth")}/>
        </Box>
    );
}

export default Planets;