import React, {useEffect} from "react";
import {useCourses} from "../hooks/useCourses";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {COURSE_DETAILS} from "../common/routes";
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
    root1: {
        width: 319,
        // height: 542,
        // height: "100%",
        marginTop: theme.spacing(2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    }
}));

function CoursesPage() {
    const classes = useStyles();

    let history = useHistory();
    const {loadCourses, courses} = useCourses();
    const location = useLocation();


    useEffect(() => {
        loadCourses();
    },[location]);


    const handleClickView = (id) => {
        history.push(COURSE_DETAILS + "/" + id);
    };

    return (
        <>
            <Grid
                container
                direction={"row"}
            >
                <Grid
                    item
                    lg={12}
                >
                    <Typography variant={"h2"}>
                        All Courses
                    </Typography>
                </Grid>
            {courses?.map(course => (
                <Grid
                    item
                    lg={3}
                    style={{maxWidth: 360}}
                >
                    <CourseCard
                        title={course.title}
                        image={course.imagePath ? window.location.origin +  course.imagePath : window.location.origin + "/notAvailable.png"}
                        description={
                        <>
                            <div style={{marginBottom: 10}}>
                                <Typography className={classes.flex}>
                                    Price: &nbsp;<b>{course?.price?.normal + "€"}</b> &nbsp;| Bookable:&nbsp;
                                    {course?.open && <CheckIcon style={{color: 'green'}}/>}
                                </Typography>
                            </div>

                            <div style={{marginBottom: 10}}>
                                <Typography>
                                Duration: <b>{course?.duration}</b>
                                </Typography>
                            </div>

                            <div style={{marginBottom: 10}}>
                                <Typography>
                                Dates: <b>{course?.dates?.start_date.replaceAll("-", "/")} - {course?.dates?.end_date.replaceAll("-", "/")}</b>
                                </Typography>
                            </div>
                            </>
                        }
                        handleClick={() => handleClickView(course.id)}
                    />
                </Grid>
            ))}
            </Grid>
        </>
    );


}

export default CoursesPage;
