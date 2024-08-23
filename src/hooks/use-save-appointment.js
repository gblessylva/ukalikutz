import { useState } from '@wordpress/element';

const useSaveAppointment = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const saveAppointment = async ({ clientName, appointmentDate, stylist }) => {

        // Reset messages
        setErrorMessage(null);
        setSuccessMessage(null);

        // Validate form fields
        if (!clientName || !appointmentDate  || !stylist) {
            console.log('All fields are required.');
            setErrorMessage('All fields are required.');
            return;
        }

        const formattedDate = appointmentDate.toISOString().split('T')[0]; // Format the date
        setLoading(true);

        try {
            const response = await fetch('/wp-json/ukalikutz/v1/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': wpApiSettings.nonce, // WordPress nonce for authentication
                },
                body: JSON.stringify({
                    client_name: clientName,
                    appointment_date: formattedDate,
                    stylist: stylist,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.message);
                setErrorMessage(result.message || 'An error occurred while saving the appointment.');
            } else {
                console.log("saved");
                setSuccessMessage('Appointment saved successfully!');
            }
        } catch (error) {
            setErrorMessage('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        saveAppointment,
        errorMessage,
        successMessage,
        loading,
    };
};

export default useSaveAppointment;
