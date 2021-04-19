import React, {useState} from 'react';
import {Avatar, Box, Button, Fab, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";
import {getPlanetIcon} from "../../utils/utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {AVAILABLE_PLANETS, AVAILABLE_STATUSES} from "../../utils/constants";
import {useModuleContext} from "../../utils/ModuleContext";
import {useSnackbar} from "notistack";
import AvatarSelect from "../common/AvatarSelect";
import {useCaptain} from "../../utils/CaptainContext";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: '8px',
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(2)
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    large: {
        width: "256px",
        height: "256px",
        alignSelf: "center"
    },
    input: {
        paddingBottom: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(2)
    }
}));

const PlanetDetails = ({planet}) => {
    const {dispatch: dispatchModule} = useModuleContext();
    const {state: {captain}} = useCaptain();
    const {enqueueSnackbar} = useSnackbar();
    const [avatar, setAvatar] = useState(planet?.img || AVAILABLE_PLANETS[0]);
    const [avatarSelection, setAvatarSelection] = useState(false);
    const [name, setName] = useState(planet?.name || "");
    const [description, setDescription] = useState(planet?.description || "");
    const [robots, setRobots] = useState("");
    const [status, setStatus] = useState(AVAILABLE_STATUSES[0]);
    const classes = useStyles();

    const onAvatarSelect = () => {
        setAvatarSelection(true);
    }

    const handleCloseAvatarSelect = () => {
        setAvatarSelection(false);
    }

    const handleAvatarSelection = (avatar) => {
        setAvatar(avatar);
        setAvatarSelection(false);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleRobotsChange = (event) => {
        setRobots(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleChangePlanet = () => {
        const newPlanet = {
            captainId: captain._id,
            img: avatar,
            name,
            description,
            status,
            robots
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPlanet)
        };
        if (planet && planet._id) {
            newPlanet.id = planet._id;
            requestOptions.method = "PUT";
            requestOptions.body = JSON.stringify(newPlanet);
        }
        fetch("http://localhost:3001/api/planets", requestOptions).then(res => {
            return res.json();
        }).then((data) => {
            if (data.status === true) {
                if (planet?._id) {
                    enqueueSnackbar('Planet updated successfully! <3', {variant: "success"});
                } else {
                    enqueueSnackbar('Planet added successfully! <3', {variant: "success"});
                }
            } else {
                enqueueSnackbar('Something went wrong :(', {variant: "error"});
                console.error(data.message);
            }
        }).catch((err) => {
            enqueueSnackbar('Something went wrong :(', {variant: "error"});
            console.error(err);
        });
        onClose();
    }

    const onClose = () => {
        dispatchModule({type: "back"});
    }

    const currentAvatar = getPlanetIcon(avatar);
    const showAddUpdatePlanetButton = planet?._id && captain?._id === planet._id;
    return (
        <Box className={classes.root}>
            <Avatar alt="Planet" src={currentAvatar} className={classes.large} onClick={onAvatarSelect}/>
            <TextField className={classes.input} label="Name" value={name} onChange={handleNameChange}/>
            <TextField className={classes.input} multiline rows={4} label="Description" value={description}
                       onChange={handleDescriptionChange}/>
            <TextField className={classes.input} label="Robots" value={robots}
                       onChange={handleRobotsChange}/>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
                labelId="status-label"
                value={status}
                onChange={handleStatusChange}
            >
                {AVAILABLE_STATUSES.map(status => {
                    return <MenuItem value={status}>{status}</MenuItem>
                })}
            </Select>
            {!showAddUpdatePlanetButton && <Button className={classes.button} variant="contained" color="primary"
                                                   onClick={handleChangePlanet}>
                {planet?._id ? "Update Planet" : "Add Planet"}
            </Button>}
            <Fab color="secondary" aria-label="Close" className={classes.fab} onClick={onClose}>
                <ArrowBackIcon/>
            </Fab>
            <AvatarSelect open={avatarSelection} handleClose={handleCloseAvatarSelect}
                          handleListItemClick={handleAvatarSelection} avatarList={AVAILABLE_PLANETS}/>
        </Box>
    )
}

export default PlanetDetails;
