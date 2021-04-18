import React, {useEffect, useState} from 'react';
import {Box, Fab, List, makeStyles} from "@material-ui/core";
import CaptainListItem from "./CaptainListItem";
import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from "prop-types";
import {useSnackbar} from "notistack";
import CaptainDetails from "./CaptainDetails";

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

class Alert extends React.Component {
    render() {
        return null;
    }
}

Alert.propTypes = {
    severity: PropTypes.string,
    onClose: PropTypes.any,
    children: PropTypes.node
};
const Captains = (props) => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [data, setData] = useState([]);
    const [selectedCaptain, setSelectedCaptain] = useState(null);
    const [newCaptain, setNewCaptain] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("http://localhost:3001/api/captains").then((response) => {
            return response.json();
        }).then((data) => {
            setData(data.data);
        });
    }

    const onSelectCaptain = (captain) => {
        setSelectedCaptain(captain);
    }

    const addNewCaptain = () => {
        setNewCaptain(true);
    }

    const onCloseCaptainDetails = () => {
        setNewCaptain(false);
        setSelectedCaptain(null);
    }

    const onChangeCaptain = (id, avatar, name, description) => {
        setNewCaptain(false);
        const newCaptain = {
            img: avatar,
            name,
            description
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCaptain)
        };
        if (id) {
            newCaptain.id = id;
            requestOptions.method = "PUT";
            requestOptions.body = JSON.stringify(newCaptain);
            setSelectedCaptain(null);
        }
        fetch("http://localhost:3001/api/captains", requestOptions).then(res => {
            return res.json();
        }).then((data) => {
            if (data.status === true) {
                if (id) {
                    enqueueSnackbar('Captain updated successfully! <3', {variant: "success"});
                } else {
                    enqueueSnackbar('Captain added successfully! <3', {variant: "success"});
                }

                fetchData();
            } else {
                enqueueSnackbar('Something went wrong :(', {variant: "error"});
                console.error(data.message);
            }
        }).catch((err) => {
            enqueueSnackbar('Something went wrong :(', {variant: "error"});
            console.error(err);
        })
    }

    if (newCaptain) {
        return <CaptainDetails onClose={onCloseCaptainDetails} onChangeCaptain={onChangeCaptain}/>
    } else if (selectedCaptain) {
        return <CaptainDetails captain={selectedCaptain} onClose={onCloseCaptainDetails}
                               onChangeCaptain={onChangeCaptain}/>
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