import React, {useEffect} from "react";
import {useCourses} from "../hooks/useCourses";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function CoursesPage() {

    const {loadCourses, courses} = useCourses();

    useEffect(() => {
        loadCourses();
    },[]);

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
                        image={window.location.origin +  course.imagePath}
                    />
                </Grid>
            ))}
            </Grid>
        </>
    );


}

export default CoursesPage;
