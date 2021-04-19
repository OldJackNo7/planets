import React from 'react';
import {Avatar, Box, ListItem, makeStyles, Typography} from "@material-ui/core";
import {getPlanetIcon} from "../../utils/utils";
import {EN_ROUTE, NOT_OK, OK, TODO} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
    avatarBox: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(1)
    },
    descriptionBox: {
        display: "flex",
        flexDirection: "column"
    },
    statusBox: {
        display: "flex",
        justifyContent: "center",
        flexGrow: 1
    },
    captain: {
        fontSize: 12
    },
    robots: {
        fontSize: 14
    },
    avatar: {
        backgroundColor: "unset",
        width: "48px",
        height: "48px"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    planetName: {
        fontWeight: "bold",
    },
    gray: {
        color: "gray"
    },
    green: {
        color: "green"
    },
    red: {
        color: "red"
    },
    violet: {
        color: "violet"
    }
}));

const PlanetListItem = ({planet, onClick, captainList}) => {
    const classes = useStyles();
    //todo: what if the use does not have the captain list?
    // idk how but what if?
    // maybe because of future default module change?
    // also not at all efficient, should do something about it...
    const foundCaptain = captainList.find((captain) => captain._id === planet.captainId);
    let statusColor;
    switch (planet.status) {
        case TODO:
            statusColor = "gray";
            break;
        case OK:
            statusColor = "green";
            break;
        case NOT_OK:
            statusColor = "red";
            break;
        case EN_ROUTE:
            statusColor = "violet";
            break;
        default:
            statusColor = "gray";

    }
    return <ListItem button onClick={() => onClick(planet)} key={planet._id}>
        <Box className={classes.avatarBox}>
            <Avatar className={classes.avatar}>
                <img className={classes.image} src={getPlanetIcon(planet.img)} alt={planet.name}/>
            </Avatar>
            <Typography variant={"subtitle2"} className={classes.planetName}>
                {planet.name}
            </Typography>
        </Box>
        <Box className={classes.descriptionBox}>
            <Typography className={classes.description}>
                <i>{planet.description ? '"' + planet.description + '"' : "No description yet..."}</i>
            </Typography>
            <Typography className={classes.captain}>
                <b>by captain:</b> <u>{foundCaptain.name}</u>
            </Typography>
            {planet.robots && <Typography className={classes.robots}>
                <b>Robots: </b> {planet.robots}
            </Typography>
            }
        </Box>
        <Box className={classes.statusBox}>
            <Typography className={classes[statusColor]}>
                {planet.status}
            </Typography>
        </Box>
    </ListItem>;
}

export default PlanetListItem;