import { useState } from '@wordpress/element';

const useSaveAppointment = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const saveAppointment = async ({ selectedClient, appointmentDate, selectedStylist }) => {

        // Reset messages
        setErrorMessage(null);
        setSuccessMessage(null);

        // Validate form fields
        if (!selectedClient || !appointmentDate  || !selectedStylist) {
            console.log('All fields are required.');
            setErrorMessage('All fields are required.');
            return;
        }
        // console.log(appointmentDate);
        const [formattedDate, timeWithMillis] = appointmentDate.toISOString().split('T');
        const formattedTime = timeWithMillis.split('.')[0]; // This removes milliseconds and 'Z' at the end
        setLoading(true);

        try {
            const response = await fetch('/wp-json/ukalikutz/v1/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': wpApiSettings.nonce, // WordPress nonce for authentication
                },
                body: JSON.stringify({
                    client_id: selectedClient,
                    appointment_date: formattedDate,
                    appointment_time: formattedTime,
                    stylist_id: selectedStylist,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.message);
                setErrorMessage(result.message || 'An error occurred while saving the appointment.');
            } else {
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
