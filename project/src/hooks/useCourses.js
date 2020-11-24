import {useState} from "react";
import {api} from "../common/api";

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCourses = () => {
        setLoading(true);
        setError(null);

        api.get("/courses")
            .then(res => res.data)
            .then(response => {
                setLoading(false);
                setCourses(response);
            })
            .catch(err => {
                setCourses([]);
                setLoading(false);
                setError(err);
            });

    };

    return {
        courses,
        loadCourses,
        loading,
        error
    };
};
