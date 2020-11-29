import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TableContainer from "@material-ui/core/TableContainer";
import {Paper} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/styles/makeStyles";
import TableFooter from "@material-ui/core/TableFooter";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import {useCourses} from "../hooks/useCourses";
import {sortArrayLatest} from "../common/common";
import {COURSE_DETAILS, COURSES} from "../common/routes";
import {useHistory} from "react-router-dom";
import {useStats} from "../hooks/useStats";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function Dashboard() {

    const classes = useStyles();
    const {loadCourses, courses} = useCourses();
    const {loadStats, stats} = useStats();
    let history = useHistory();


    const [coursesDashboard, setCoursesDashboard] = useState([]);

    useEffect(() => {
        loadCourses();
        loadStats();
    },[]);

    useEffect(() => {
        if (courses.length > 0) {
            setCoursesDashboard(sortArrayLatest(courses));
        }
    },[courses]);

    const handleClickViewCourse = (id) => {
        history.push(COURSE_DETAILS + "/" + id);
    };

    const handleClickViewCourses = () => {
        history.push(COURSES);
    };

    return (
        <>
            <div style={{marginTop: 30, marginBottom: 30}}>
                <Grid
                    container
                    direction={"column"}
                    style={{padding: 50, height: 203, background: "lightgray"}}
                >
                    <Grid
                        item
                        lg={12}
                    >
                        <Typography variant={"h3"}>
                            Welcome to Code.Hub Dashboard!
                        </Typography>
                        <Typography variant={"h5"}>
                            Manage everything and have fun!
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Grid
                container
                direction={"row"}
            >
                {stats?.map(stat => (
                    <Grid
                        item
                        lg={3}
                        align={"center"}
                    >
                        <TextField
                            variant="outlined" name={"duration"} value={stat?.title?.toString().toUpperCase() + ": " + stat?.amount?.toString().toUpperCase()}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid
                container
                direction={"row"}
                justify={"center"}
                alignItems={"center"}
                alignContent={"center"}
                style={{marginTop: 20}}
            >

                <Grid
                    item
                    lg={11}
                    align={"center"}
                    style={{maxWidth: 1641}}
                >
                    <Paper
                        elevation={1}
                    >
                        <Grid
                            container
                            direction={"column"}
                            style={{background: "gainsboro", padding: 15}}
                        >
                            <Grid
                                item
                                lg={12}
                                align={"left"}
                            >
                                <Typography>
                                    Last 5 courses
                                </Typography>
                            </Grid>
                        </Grid>

                    </Paper>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: 50}}/>
                                    <TableCell style={{fontWeight: "bold"}}>Title</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} align="center">Bookable</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} align="center">Price</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} align="center">Date</TableCell>
                                    <TableCell style={{fontWeight: "bold"}} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coursesDashboard?.map(course => (
                                    <TableRow key={course.id}>
                                        <TableCell padding="checkbox" align="center">
                                            <InfoIcon style={{color: "lightskyblue"}}/>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {course.title}
                                        </TableCell>
                                        <TableCell align="center">{course?.open && (<CheckIcon style={{color: "green"}}/>)}</TableCell>
                                        <TableCell align="center">{course?.price?.normal && course?.price?.normal + " €"}</TableCell>
                                        <TableCell align="center">{course?.dates?.start_date && course?.dates?.end_date && course?.dates?.start_date.replaceAll("-", "/") + " - " + course?.dates?.end_date.replaceAll("-", "/")}</TableCell>
                                        <TableCell align="center"><Button variant={"outlined"} style={{background: "darkcyan", color: "white"}} onClick={() => handleClickViewCourse(course?.id)}>
                                            View Details
                                        </Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paper
                        elevation={1}
                        // style={{width: 1641}}
                        >
                        <Grid
                            container
                            direction={"column"}
                            style={{background: "gainsboro", padding: 15}}
                        >
                            <Grid
                                item
                                lg={12}
                                align={"right"}
                            >
                                <Button variant={"outlined"} style={{background: "cornflowerblue", color: "white"}} onClick={handleClickViewCourses}>
                                    View All
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>
        </>
    );


}

export default Dashboard;
