import React from "react";
import * as ROUTES from "../common/routes";
import {Route, Switch} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dashboard from "../components/Dashboard";
import CoursesPage from "../components/CoursesPage";
import CourseDetailsPage from "../components/CourseDetailsPage";

const useStyles = makeStyles({
    main: {
        minHeight: "100vh"
    }
});

function Main() {

    const classes = useStyles();

    return (
        <>

            <div className={classes.main}>
                <Switch>
                    <Route
                        exact
                        path={ROUTES.DASHBOARD}
                        component={Dashboard}
                    />

                    <Route
                        exact
                        path={ROUTES.COURSES}
                        component={CoursesPage}
                    />

                    <Route
                        path={ROUTES.COURSE_DETAILS + "/:course"}
                        component={CourseDetailsPage}
                    />

                </Switch>
            </div>

        </>
    );
}

export default Main;
