import React, {useState} from 'react';
import {Avatar, Box, Button, Fab, makeStyles, TextField} from "@material-ui/core";
import {getCaptainIcon} from "../../utils/utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AvatarSelect from "../common/AvatarSelect";
import {AVAILABLE_AVATARS, BACKEND_URL, CAPTAINS_API} from "../../utils/constants";
import {useModuleContext} from "../../utils/ModuleContext";
import {useSnackbar} from "notistack";
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

const CaptainDetails = ({captain}) => {
    const {dispatch: dispatchModule} = useModuleContext();
    const {dispatch: dispatchCaptain, state: {captain: selectedCaptain}} = useCaptain();
    const {enqueueSnackbar} = useSnackbar();
    const [avatar, setAvatar] = useState(captain?.img || AVAILABLE_AVATARS[0]);
    const [avatarSelection, setAvatarSelection] = useState(false);
    const [name, setName] = useState(captain?.name || "");
    const [description, setDescription] = useState(captain?.description || "");
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

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeCaptain = () => {
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
        if (captain && captain._id) {
            newCaptain.id = captain._id;
            requestOptions.method = "PUT";
            requestOptions.body = JSON.stringify(newCaptain);
        }
        fetch(BACKEND_URL + CAPTAINS_API, requestOptions).then(res => {
            return res.json();
        }).then((data) => {
            if (data.status === true) {
                if (captain?._id) {
                    enqueueSnackbar('Captain updated successfully! <3', {variant: "success"});
                    if (captain._id === selectedCaptain._id)
                        dispatchCaptain({type: "changeCaptain", captain: newCaptain});
                } else {
                    enqueueSnackbar('Captain added successfully! <3', {variant: "success"});
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

    const selectCaptain = () => {
        dispatchCaptain({type: "changeCaptain", captain: captain});
        onClose();
    }

    const onClose = () => {
        dispatchModule({type: "back"});
    }

    const currentAvatar = getCaptainIcon(avatar);
    return (
        <Box className={classes.root}>
            <Avatar alt="Captain" src={currentAvatar} className={classes.large} onClick={onAvatarSelect}/>
            <TextField className={classes.input} label="Name" value={name} onChange={handleNameChange}/>
            <TextField className={classes.input} multiline rows={4} label="Description" value={description}
                       onChange={handleDescriptionChange}/>
            <Button className={classes.button} variant="contained" color="primary"
                    onClick={handleChangeCaptain}>
                {captain?._id ? "Update Captain" : "Add Captain"}
            </Button>
            {captain?._id && <Button className={classes.button} variant="contained" color="primary"
                                     onClick={selectCaptain}>
                Select Captain
            </Button>}
            <Fab color="secondary" aria-label="Close" className={classes.fab} onClick={onClose}>
                <ArrowBackIcon/>
            </Fab>
            <AvatarSelect open={avatarSelection} handleClose={handleCloseAvatarSelect}
                          handleListItemClick={handleAvatarSelection} avatarList={AVAILABLE_AVATARS}/>
        </Box>
    )
}

export default CaptainDetails;
