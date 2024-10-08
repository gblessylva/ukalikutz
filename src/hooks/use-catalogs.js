// hooks/use-catalogs.js
import { useState, useEffect } from 'react';

const useCatalogs = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await fetch('/wp-json/ukalikutz/v1/catalogues');
                if (!response.ok) {
                    throw new Error('Failed to fetch catalog data');
                }
                const data = await response.json();

                console.log(data);
                setCatalogs(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCatalogs();
    }, []);

    return { catalogs, loading, error };
};

export default useCatalogs;
