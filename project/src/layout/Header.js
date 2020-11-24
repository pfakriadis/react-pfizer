import {AppBar} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import * as ROUTES from "../common/routes";


const useStyles = makeStyles( theme => ({
    appBar: {
        background: theme.palette.primary
    },
    toolBar: {
        minHeight: theme.spacing(6)
    },
    root: {
        flexGrow: 1,
    },
}));

function Header() {

    const classes = useStyles();
    // const preventDefault = (event) => event.preventDefault();

    return (
        <>
            <div className={classes.root}>
                <AppBar
                    position="static"
                    color="primary"
                    className={classes.appBar}
                    elevation={0}
                >
                    <Toolbar
                        className={classes.toolBar}
                    >
                        <Typography>
                            <Link href={ROUTES.DASHBOARD} color="inherit">
                                Code.Hub Dashboard
                            </Link>
                        </Typography>
                        <div className={classes.root}>
                            <Typography>
                                <Link href={ROUTES.ADD_NEW_COURSE} color="inherit" style={{float: "right"}}>
                                    Add New Course
                                </Link>
                                <Link href={ROUTES.COURSES} color="inherit" style={{float: "right", marginRight: 15}}>
                                    Courses
                                </Link>
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}


export default Header;
