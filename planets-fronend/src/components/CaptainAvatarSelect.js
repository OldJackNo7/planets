import React from 'react';
import {Avatar, Dialog, DialogTitle, List, ListItem, makeStyles} from "@material-ui/core";
import {AVAILABLE_AVATARS} from "../utils/constants";
import {getCaptainIcon} from "../utils/utils";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: "128px",
        height: "128px",
    },
    listItem: {
        justifyContent: "center"
    }
}));

const CaptainAvatarSelect = ({open, handleClose, handleListItemClick}) => {
    const classes = useStyles();
    return <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Select captain avatar</DialogTitle>
        <List>
            {AVAILABLE_AVATARS.map((avatar) => (
                <ListItem className={classes.listItem} button onClick={() => handleListItemClick(avatar)} key={avatar}>
                    <Avatar className={classes.avatar}>
                        <img src={getCaptainIcon(avatar)} alt="Captain"/>
                    </Avatar>
                </ListItem>
            ))}
        </List>
    </Dialog>
};

export default CaptainAvatarSelect;