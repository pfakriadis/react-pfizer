import {useState} from "react";
import {api} from "../common/api";

export const useCourse = () => {
    const [courseT, setCourse] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCourse = (id) => {
        setLoading(true);
        setError(null);

        api.get("/courses/" + id)
            .then(res => res.data)
            .then(response => {
                setLoading(false);
                setCourse(response);
            })
            .catch(err => {
                setCourse(undefined);
                setLoading(false);
                setError(err);
            });

    };

    const addCourse = (course) => {
        setLoading(true);
        setError(null);

        api.post("/courses", course)
            .then(res => res.data)
            .then(response => {
                setLoading(false);
                setCourse(response);
            })
            .catch(err => {
                setCourse(undefined);
                setLoading(false);
                setError(err);
            });

    };

    return {
        courseT,
        loadCourse,
        addCourse,
        loading,
        error
    };
};
