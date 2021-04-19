import React from 'react';
import {Avatar, Dialog, DialogTitle, List, ListItem, makeStyles} from "@material-ui/core";
import {getIcon} from "../../utils/utils";

const useStyles = makeStyles(() => ({
    avatar: {
        width: "128px",
        height: "128px",
        backgroundColor: "unset"
    },
    listItem: {
        justifyContent: "center"
    }
}));

const AvatarSelect = ({open, handleClose, handleListItemClick, avatarList}) => {
    const classes = useStyles();
    return <Dialog onClose={handleClose} aria-labelledby="dialog-title" open={open}>
        <DialogTitle id="dialog-title">Select captain avatar</DialogTitle>
        <List>
            {avatarList.map((avatar) => (
                <ListItem className={classes.listItem} button onClick={() => handleListItemClick(avatar)} key={avatar}>
                    <Avatar className={classes.avatar}>
                        <img className={classes.avatar} src={getIcon(avatar)} alt="Captain"/>
                    </Avatar>
                </ListItem>
            ))}
        </List>
    </Dialog>
};

export default AvatarSelect;