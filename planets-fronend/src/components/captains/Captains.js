import React, {useEffect, useState} from 'react';
import {Box, Fab, List, makeStyles} from "@material-ui/core";
import CaptainListItem from "./CaptainListItem";
import AddIcon from '@material-ui/icons/Add';
import CaptainDetails from "./CaptainDetails";
import {useModuleContext} from "../../utils/ModuleContext";
import {useCaptain} from "../../utils/CaptainContext";
import {BACKEND_URL, CAPTAINS_API} from "../../utils/constants";

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

const Captains = () => {
    const classes = useStyles();
    const {dispatch: dispatchModule} = useModuleContext();
    const {dispatch: dispatchCaptain} = useCaptain();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(BACKEND_URL + CAPTAINS_API).then((response) => {
            return response.json();
        }).then((data) => {
            setData(data.data);
            dispatchCaptain({type: "setCaptainList", captainList: data.data});
        });
    }

    const onSelectCaptain = (captain) => {
        dispatchModule({type: "forward", module: CaptainDetails, props: {captain: captain}});
    }

    const addNewCaptain = () => {
        dispatchModule({type: "forward", module: CaptainDetails, props: {}});
    }

    return (
        <Box>
            <List className={classes.root}>
                {data.map(captain => {
                    return <CaptainListItem captain={captain} onClick={onSelectCaptain}/>;
                })}
            </List>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={addNewCaptain}>
                <AddIcon/>
            </Fab>
        </Box>
    );
}

export default Captains;