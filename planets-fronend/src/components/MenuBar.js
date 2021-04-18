import React, {useState} from 'react';
import {AppBar, makeStyles, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {CAPTAINS_MODULE, PLANETS_MODULE} from "../utils/constants";

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
}));

const MenuBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuSelection = (selection) => {
        const {selectModule} = props;
        selectModule(selection);
        handleClose();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Planetary explorer
                </Typography>
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