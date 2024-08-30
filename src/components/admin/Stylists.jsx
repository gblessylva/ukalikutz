import { useEffect, useState } from 'react';
import { Spinner } from '@wordpress/components'; // Optional: for showing a loading spinner

const Stylists = () => {
    const [stylists, setStylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch stylists from the REST API
        const fetchStylists = async () => {
            try {
                const response = await fetch('/wp-json/ukalikutz/v1/stylists');
                const data = await response.json();
                setStylists(data);
            } catch (error) {
                console.error('Error fetching stylists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStylists();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (!stylists.length) {
        return <p>No stylists found.</p>;
    }

    return (
        <div>
            <h2>Stylists</h2>
            <ul>
                {stylists.map(stylist => (
                    <li key={stylist.ID}>
                        <strong>{stylist.display_name}</strong> ({stylist.user_email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Stylists };
