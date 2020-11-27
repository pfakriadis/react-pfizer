import {useState} from "react";
import {api} from "../common/api";

export const useInstructor = () => {
    const [instructor, setInstructor] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadInstructor = (id) => {
        setLoading(true);
        setError(null);

        api.get("/instructors/" + id)
            .then(res => res.data)
            .then(response => {
                setLoading(false);
                setInstructor(response);
            })
            .catch(err => {
                setInstructor(undefined);
                setLoading(false);
                setError(err);
            });

    };

    return {
        instructor,
        loadInstructor,
        loading,
        error
    };
};
