import {useState} from "react";
import {api} from "../common/api";

export const useStats = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadStats = () => {
        setLoading(true);
        setError(null);

        api.get("/stats")
            .then(res => res.data)
            .then(response => {
                setLoading(false);
                setStats(response);
            })
            .catch(err => {
                setStats([]);
                setLoading(false);
                setError(err);
            });

    };

    return {
        stats,
        loadStats,
        loading,
        error
    };
};
