import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

const CaptainListItem = ({captain, onClick}) => {
    const icon = require("../resources/captains/" + captain.img).default; //todo: should do something if the icon does not exist
    return <ListItem button onClick={() => onClick(captain)} key={captain._id}>
        <ListItemAvatar>
            <Avatar>
                <img src={icon} alt={captain.name}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={captain.name} secondary={captain.description}/>
    </ListItem>;
}

export default CaptainListItem;