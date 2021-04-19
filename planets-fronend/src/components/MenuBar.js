import React, {useState} from 'react';
import {AppBar, Box, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {CAPTAINS_MODULE, PLANETS_MODULE} from "../utils/constants";
import {useCaptain} from "../utils/CaptainContext";
import {useModuleContext} from "../utils/ModuleContext";
import Captains from "./captains/Captains";
import Planets from "./planets/Planets";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titleBox: {
        flexDirection: "column",
        flexGrow: 1
    }
}));

const MenuBar = () => {
    const classes = useStyles();
    const {state: {captain}} = useCaptain();
    const {dispatch: dispatchModule} = useModuleContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuSelection = (selection) => {
        switch(selection) {
            case CAPTAINS_MODULE:
                dispatchModule({type: "newNavigation", module: Captains, props: {}});
                break;
            case PLANETS_MODULE:
                dispatchModule({type: "newNavigation", module: Planets, props: {}});
                break;
            default:
                console.error("Something broke on module selection... it shouldn't tho?"); //todo: treat this case
        }
        handleClose();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Box className={classes.titleBox}>
                    <Typography variant="h6">
                        Planetary explorer
                    </Typography>
                    <Typography variant="h9">
                        <b>Captain:</b> {!captain ? "No selected captain" : captain.name}
                    </Typography>
                </Box>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={handleClick}>
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleMenuSelection(CAPTAINS_MODULE)}>Captains</MenuItem>
                    <MenuItem onClick={() => handleMenuSelection(PLANETS_MODULE)}>Planets</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;