import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {useCourses} from "../hooks/useCourses";
import {useInstructors} from "../hooks/useInstructors";
import {useCourse} from "../hooks/useCourse";
import {useHistory, useLocation, useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
        margin: 10
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    margin: {
        marginTop: 8,
        marginBottom: 8
    }
}));

function AddNewCourse() {
    const classes = useStyles();

    const {loadInstructors, instructors} = useInstructors();
    const {addCourse, editCourse} = useCourse();
    const {loadCourses, courses} = useCourses();
    let { action } = useParams();

    const location = useLocation();
    let history = useHistory();




    const [state, setState] = useState({});
    const [stateOpen, setStateOpen] = useState(false);

    const [instructorsSelected, setInstructorsSelected] = useState([]);
    const [newCourse, setNewCourse] = useState({id: "", title: "", imagePath: "", price: {normal: "", early_bird: ""},
        dates: {start_date: "", end_date: ""}, duration: "", open: true, instructors: [], description: ""});


    useEffect(() => {
        // if (action === "add") {
            loadInstructors();
            loadCourses();
        // }
    },[]);

    useEffect(() => {
        console.log(location?.pathname); // result: '/secondpage'
        console.log(location?.search); // result: '?query=abc'
        console.log(location?.state); // result: 'some_value'
        if (action === "edit") {
            setNewCourse(location.state.course);
            setStateOpen(!location.state.course.open);
        }
    }, [location]);

    useEffect(() => {
        let checkedUpdated = {...state};

        if (instructors.length > 0) {
            instructors.forEach(instructor => {
                checkedUpdated[instructor.id] = action === "add" && false;
            });
        }
        action === "edit" && location.state.course?.instructors.forEach(instructorId => checkedUpdated[instructorId] = true);
        setState(checkedUpdated);
    },[instructors]);

    useEffect(() => {
        if (courses.length > 0 && action === "add") {
            let newCourseUpdated = {...newCourse};
            let id = 0;
            courses.forEach(course => {
                id = id < parseInt(course?.id) ? parseInt(course?.id) : id;
            });
            newCourseUpdated.id = "0" + (id + 1).toString();
            setNewCourse(newCourseUpdated);
        }
    },[courses]);

    const  handleChangeCheckBoxInstructor = (name, checked) => {
        let stateUpdated = {...state};
        let instructorsUpdated = [...instructorsSelected];
        let newCourseUpdated = {...newCourse};


        if (checked) {
            stateUpdated[name] = true;
            instructorsUpdated.push(name);
        }
        else {
            stateUpdated[name] = false;
            const instructorsIndex = instructorsUpdated.indexOf(name);
            if (instructorsIndex !== -1) {
                instructorsUpdated.splice(instructorsIndex, 1);
            }
        }
        newCourseUpdated.instructors = instructorsUpdated;
        setNewCourse(newCourseUpdated);
        setInstructorsSelected(instructorsUpdated);
        setState(stateUpdated);
    };

    const  handleChangeCheckBox = (name, checked) => {
        let newCourseUpdated = {...newCourse};
        let stateUpdated = {...stateOpen};
        console.log(state);

        if (checked) {
            newCourseUpdated.open = false;
            stateUpdated = true;
        }
        else {
            newCourseUpdated.open = true;
            stateUpdated = false;
        }

        setNewCourse(newCourseUpdated);
        setStateOpen(stateUpdated);
    };

    const  handleChangeTextField = (name, value) => {
        let newCourseUpdated = {...newCourse};

        if (name === "start_date" || name === "end_date") {
            newCourseUpdated["dates"][name] = value;
        }
        else if (name === "normal" || name === "early_bird") {
            newCourseUpdated["price"][name] = value;
        }
        else {
            newCourseUpdated[name] = value;
        }

        setNewCourse(newCourseUpdated);
    };

    const  handleOnClick = async () => {
        action === "add" ? await addCourse(newCourse) : await editCourse(newCourse);
        history.goBack();
    };

    return (
        <>
            <form className={classes.form} noValidate autoComplete="off">
                <Grid
                    container
                    direction={"row"}
                >
                    <Grid
                        item
                        lg={12}
                    >
                        <Typography>Title:</Typography>
                        <TextField
                            fullWidth size={"small"} id="standard-basic" variant="outlined" name={"title"} value={newCourse?.title} className={classes.margin}
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                        />
                    </Grid>

                    <Grid
                        item
                        lg={12}
                    >
                        <Typography>Duration:</Typography>
                        <TextField
                            fullWidth size={"small"} id="standard-basic" variant="outlined" name={"duration"} value={newCourse?.duration} className={classes.margin}
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                        />
                    </Grid>

                    <Grid
                        item
                        lg={12}
                    >
                        <Typography>Image Path:</Typography>
                        <TextField
                            fullWidth size={"small"} id="standard-basic" variant="outlined" name={"imagePath"} value={newCourse?.imagePath} className={classes.margin}
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={stateOpen}
                                    onChange={(event) => handleChangeCheckBox(event.target.name, event.target.checked)}
                                    name="open"
                                    color="primary"
                                />
                            }
                            label="Booked"
                            className={classes.margin}
                        />
                        <Box
                            pt={3}
                            pb={2}
                        >
                            <Divider/>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                    >
                        <Typography variant={"h4"}>
                            Instructors
                        </Typography>
                        {instructors?.map(instructor => (
                            <Grid
                                item
                                lg={12}
                            >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        name={instructor?.id}
                                        value={state[instructor?.id]}
                                        checked={state[instructor?.id]}
                                        onChange={(event) => handleChangeCheckBoxInstructor(event.target.name, event.target.checked)}
                                    />
                                }
                                label={instructor?.name?.first + " " + instructor?.name?.last}
                                className={classes.margin}
                            />
                            </Grid>
                        ))}
                        <Box
                            pt={3}
                            pb={2}
                        >
                            <Divider/>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        lg={12}
                    >
                        <Typography>Description:</Typography>
                        <TextField
                            fullWidth multiline size={"small"} rows={4} id="standard-basic" variant="outlined" name={"description"} value={newCourse?.description} className={classes.margin}
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                        />

                        <Box
                            pt={3}
                            pb={2}
                        >
                            <Divider/>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        lg={12}
                    >
                        <Typography variant={"h4"}>
                            Dates
                        </Typography>
                        <Typography>Start Date:</Typography>
                        <TextField
                            id="date"
                            // label="Birthday"
                            type="date"
                            name={"start_date"}
                            value={newCourse?.dates?.start_date}
                            fullWidth
                            size={"small"}
                            defaultValue="2017-05-24"
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                            // className={classes.textField}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.margin}
                        />
                        <Typography>End Date:</Typography>
                        <TextField
                            id="date"
                            // label="Birthday"
                            type="date"
                            name={"end_date"}
                            fullWidth
                            size={"small"}
                            value={newCourse?.dates?.end_date}
                            defaultValue="2017-05-24"
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                            // className={classes.textField}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.margin}
                        />

                        <Box
                            pt={3}
                            pb={2}
                        >
                            <Divider/>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        lg={12}
                    >
                        <Typography variant={"h4"}>
                            Price
                        </Typography>

                        <Typography>Early Bird:</Typography>
                        <TextField
                            fullWidth size={"small"} type="number" id="standard-basic" variant="outlined" name={"early_bird"} value={newCourse?.price?.early_bird} className={classes.margin}
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                        />

                        <Typography>Normal price:</Typography>
                        <TextField
                            fullWidth size={"small"} type="number" id="standard-basic" variant="outlined" name={"normal"} value={newCourse?.price?.normal} className={classes.margin}
                            onChange={(event) => handleChangeTextField(event.target.name, event.target.value)}
                        />

                        <Box
                            pt={3}
                            pb={2}
                        >
                            <Divider/>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        lg={12}
                        align={"right"}
                    >
                        <Button variant={"contained"} color="primary" onClick={handleOnClick}>
                            {action === "add" ? "Add Course" : "Edit Course"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );


}

export default AddNewCourse;
