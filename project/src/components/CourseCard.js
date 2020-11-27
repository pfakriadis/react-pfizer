import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root1: {
        width: 319,
        // height: 542,
        // height: "100%",
        marginTop: theme.spacing(2)
    },
    media: {
        height: 269,
        // paddingTop: "56.25%", // 16:9
    },
}));

const CourseCard = ({
    title,
    description,
    image,
    handleClick
}) => {
    const classes = useStyles();

    return (
        <Card
            className={classes.root1}
        >

            <CardHeader
                title={title}
            />

            <CardMedia
                className={classes.media}
                image={image}
                src={image}
            />

            <CardContent>
                {description}
            </CardContent>

            <CardActions>
                <Grid
                    container
                    direction={"row"}
                >
                    <Grid
                        item
                        lg={12}
                        align={"right"}
                    >
                        <Button variant={"contained"} color="primary" onClick={handleClick}>
                            View
                        </Button>
                    </Grid>
                </Grid>

            </CardActions>

        </Card>
    );
};

CourseCard.defaultProps = {
    title: "",
    subtitle: ""
};

CourseCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.object,
    image: PropTypes.string,
    handleClick: PropTypes.func
};

export default CourseCard;
