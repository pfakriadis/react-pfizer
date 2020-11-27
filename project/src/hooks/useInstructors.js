import {useState} from "react";
import {api} from "../common/api";

export const useInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadInstructors = () => {
        setLoading(true);
        setError(null);

        api.get("/instructors")
            .then(res => res.data)
            .then(response => {
                setLoading(false);
                setInstructors(response);
            })
            .catch(err => {
                setInstructors([]);
                setLoading(false);
                setError(err);
            });

    };

    return {
        instructors,
        loadInstructors,
        loading,
        error
    };
};
