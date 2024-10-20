import { useState, useEffect } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const AppointmentDetails = () => {
    // State to manage stylists and loading state
    const [stylists, setStylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch stylists from the API when the component mounts
    useEffect(() => {
        const fetchStylists = async () => {
            try {
                const response = await apiFetch({ path: '/ukalikutz/v1/stylists' });
                const stylistOptions = response.map((stylist) => ({
                    value: stylist.ID, // Adjust this to match the API response
                    label: stylist.display_name, // Adjust this to match the API response
                }));
                setStylists(stylistOptions);
            } catch (error) {
                console.error('Error fetching stylists:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStylists();
    }, []);

    return (
        <div className="appointment-details">
            <h3>Appointment Details</h3>

            {/* Stylist Selection */}
            <h4>Select a Stylist</h4>
            {isLoading ? (
                <p>Loading stylists...</p>
            ) : (
                <SelectControl
                    label="Stylists"
                    options={stylists}
                    onChange={(value) => console.log('Selected stylist ID:', value)}
                />
            )}
        </div>
    );
};

export default AppointmentDetails;
