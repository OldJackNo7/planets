import React, {useEffect, useState} from 'react';
import {Box, Fab, List, makeStyles} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useModuleContext} from "../../utils/ModuleContext";
import PlanetListItem from "./PlanetListItem";
import PlanetDetails from "./PlanetDetails";
import {useCaptain} from "../../utils/CaptainContext";
import {useSnackbar} from "notistack";
import {BACKEND_URL, PLANETS_API} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: '8px'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const Planets = () => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const {dispatch: dispatchModule} = useModuleContext();
    const {state: {captain, captainList}} = useCaptain();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(BACKEND_URL + PLANETS_API).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data.data);
        });
    }

    const onSelectPlanet = (planet) => {
        dispatchModule({type: "forward", module: PlanetDetails, props: {planet: planet}});
    }

    const addNewPlanet = () => {
        if(!captain) {
            enqueueSnackbar('Must have a captain selected to add a planet!', {variant: "error"});
            return;
        }
        dispatchModule({type: "forward", module: PlanetDetails, props: {}});
    }

    return (
        <Box>
            <List className={classes.root}>
                {data.map(planet => {
                    return <PlanetListItem captainList={captainList} planet={planet} onClick={onSelectPlanet}/>;
                })}
            </List>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={addNewPlanet}>
                <AddIcon/>
            </Fab>
        </Box>
    );
}

export default Planets;