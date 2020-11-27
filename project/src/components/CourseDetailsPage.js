import React, {useEffect, useState} from "react";
import {useCourses} from "../hooks/useCourses";
import {COURSE_DETAILS} from "../common/routes";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CourseCard from "./CourseCard";
import {useCourse} from "../hooks/useCourse";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {useInstructor} from "../hooks/useInstructor";
import {
    useParams
} from "react-router-dom";

function CourseDetailsPage() {

    const {loadCourse, courseT} = useCourse();
    const {loadInstructor, instructor} = useInstructor();
    let { course } = useParams();
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        loadCourse(course);
    },[]);

    useEffect(() => {
        courseT?.instructors?.forEach(instructorID => loadInstructor(instructorID));
    },[courseT]);

    useEffect(() => {
        if (instructor) {
            let instructorsUpdated = [...instructors];
            instructorsUpdated?.push(instructor);
            setInstructors(instructorsUpdated);
        }

    },[instructor]);

    const handleClickView = (id) => {
        // navigate(COURSE_DETAILS + "/" + id);
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
                        {courseT?.title + " (" + courseT?.id + ")"}
                    </Typography>
                </Grid>
                <Grid
                    item
                    lg={12}
                >
                    <img src={courseT?.imagePath} height={225} width={"100%"}/>
                </Grid>

                <Grid
                    item
                    lg={12}
                >
                    <Box
                        pt={3}
                        pb={2}
                    >
                        <Divider/>
                    </Box>
                </Grid>

                <Grid
                    spacing={2}
                    container
                    direction={"row"}
                >
                    <Grid
                        item
                        lg={6}
                    >
                        <Typography variant={"h4"}>
                            {"Price: " + courseT?.price?.normal + " €"}
                        </Typography><br/>
                        <Typography variant={"h4"}>
                            {"Bookable: " + courseT?.price?.normal + " €"}
                        </Typography>


                    </Grid>

                    <Grid
                        item
                        lg={6}
                        align={"right"}
                    >
                        <Typography variant={"h4"}>
                            {"Price: " + courseT?.price?.normal + " €"}
                        </Typography><br/>
                        <Typography variant={"h4"}>
                            {"Bookable: " + courseT?.price?.normal + " €"}
                        </Typography>

                    </Grid>
                </Grid>

                <Grid
                    item
                    lg={12}
                >
                    <div dangerouslySetInnerHTML={{__html: courseT?.description}}/>
                </Grid>

                <Grid
                    item
                    lg={12}
                >
                    <Typography variant={"h2"}>
                        Instructors
                    </Typography>
                </Grid>

                {instructors?.map(instructor => instructor && (
                    <Grid
                        item
                        lg={12}
                    >
                        <Typography variant={"h4"}>
                            {instructor?.name?.first + " " + instructor?.name?.last + " (" + instructor?.dob + ")"}
                        </Typography><br/>
                        <Typography>
                            Email: <span style={{color: "blue"}}>{instructor?.email}</span> |
                            <span style={{color: "blue", textDecoration: "none"}}>
                                <a href={instructor?.linkedin} style={{color: "blue", textDecoration: "none"}}> Linkedin</a>
                            </span>
                        </Typography><br/>
                        <Typography>{instructor?.bio}</Typography>
                    </Grid>
                ))}
                {/*{courseT && (
                    <Grid
                        item
                        lg={3}
                        style={{maxWidth: 360}}
                    >
                        <CourseCard
                            title={courseT.title}
                            image={window.location.origin +  courseT.imagePath}
                            handleClick={() => handleClickView(courseT.id)}
                        />
                    </Grid>
                )}*/}
            </Grid>
        </>
    );


}

export default CourseDetailsPage;
