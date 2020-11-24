import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root1: {
        width: 319,
        height: 542,
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
};

export default CourseCard;
