import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        height: "inherit",
    },
}));

const Layout = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header />
            <Main />
            <Footer />
        </div>
    );


};

export default Layout;

