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

    const addCourse = async (course) => {
        setLoading(true);
        setError(null);

        await api.post("/courses", course)
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

    const editCourse = async (course) => {
        setLoading(true);
        setError(null);
        const id = course?.id;
        delete course[id];

        await api.put("/courses/" + id, course)
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

    const deleteCourse = async (course) => {
        setLoading(true);
        setError(null);
        const id = course?.id;

        await api.delete("/courses/" + id)
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
        editCourse,
        deleteCourse,
        loading,
        error
    };
};
