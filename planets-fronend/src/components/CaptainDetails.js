import React, {useState} from 'react';
import {Avatar, Box, Button, Fab, makeStyles, TextField} from "@material-ui/core";
import {getCaptainIcon} from "../utils/utils";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CaptainAvatarSelect from "./CaptainAvatarSelect";
import {AVAILABLE_AVATARS} from "../utils/constants";

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
    }
}));

const CaptainDetails = ({captain, onChangeCaptain, onClose, selectCaptain}) => {
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
        onChangeCaptain(captain && captain._id || null, avatar, name, description);
    }

    const currentAvatar = getCaptainIcon(avatar);
    return (
        <Box className={classes.root}>
            <Avatar alt="Captain" src={currentAvatar} className={classes.large} onClick={onAvatarSelect}/>
            <TextField className={classes.input} label="Name" value={name} onChange={handleNameChange}/>
            <TextField className={classes.input} multiline rows={4} label="Description" value={description}
                       onChange={handleDescriptionChange}/>
            <Button variant="contained" color="primary"
                    onClick={handleChangeCaptain}>
                {captain?._id ? "Update Captain" : "Add Captain"}
            </Button>
            {captain?._id && <Button variant="contained" color="primary"
                                    onClick={selectCaptain}>
                Select Captain
            </Button>}
            <Fab color="secondary" aria-label="Close" className={classes.fab} onClick={onClose}>
                <ArrowBackIcon/>
            </Fab>
            <CaptainAvatarSelect open={avatarSelection} handleClose={handleCloseAvatarSelect}
                                 handleListItemClick={handleAvatarSelection}/>
        </Box>
    )
}

export default CaptainDetails;
