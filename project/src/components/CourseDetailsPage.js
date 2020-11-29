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
    useHistory,
    useParams
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteDialog from "./DeleteDialog";

function CourseDetailsPage() {

    const {loadCourse, courseT, deleteCourse} = useCourse();
    const {loadInstructor, instructor} = useInstructor();
    let { course } = useParams();
    let history = useHistory();
    const [instructors, setInstructors] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);


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

    const handleEdit = () => {
        history.push("/edit", {course: courseT});
    };

    const handleDeleteConfirm = () => {
        setOpenDialog(true);
    };

    const handleDelete = async () => {
        setOpenDialog(false);
        await deleteCourse(courseT);
        history.goBack();
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
                    <Button variant={"outlined"} onClick={handleEdit} style={{marginRight: 10, background: "blue", color: "white"}}>
                        Edit
                    </Button>

                    <Button variant={"outlined"} onClick={handleDeleteConfirm} style={{background: "red", color: "white"}}>
                        Delete
                    </Button>
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
                <DeleteDialog open={openDialog} handleDelete={handleDelete} title={courseT?.title}/>
            </Grid>
        </>
    );


}

export default CourseDetailsPage;
