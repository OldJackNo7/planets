import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import {getCaptainIcon} from "../../utils/utils";

const CaptainListItem = ({captain, onClick}) => {
    return <ListItem button onClick={() => onClick(captain)} key={captain._id}>
        <ListItemAvatar>
            <Avatar>
                <img src={getCaptainIcon(captain.img)} alt={captain.name}/>
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={captain.name} secondary={captain.description}/>
    </ListItem>;
}

export default CaptainListItem;