import {AppBar} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";


const useStyles = makeStyles(theme => ({
    appBar: {
        background: theme.palette.secondary["50"]
    },
    toolBar: {
        minHeight: theme.spacing(6)
    },
}));

function Header() {

    const classes = useStyles();

    return (
        <>
            <AppBar
                position="static"
                color="primary"
                className={classes.appBar}
                elevation={0}
            >
                <Toolbar
                    className={classes.toolBar}
                />
            </AppBar>
        </>
    );
}


export default Header;
