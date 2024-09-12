import { useFetchAppointments } from '../../hooks/use-fetch-appointments';
import { Spinner } from '@wordpress/components'; // For loading state
import './styles/AppointmentListView.css'; // For custom styles

const AppointmentListView = () => {
    const { appointments, loading, error } = useFetchAppointments();

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error loading appointments: {error.message}</div>;
    }


    return (
        <div className="appointment-list-view">
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-item">
                        <h4>{appointment.title}</h4>
                        <p>Date: {appointment.formated_date}</p>
                        <p>Time: {appointment.formated_time}</p>
                        <p>Stylist: {appointment.stylist}</p>
                        <p>Client: {appointment.client}</p>
                    </div>
                ))
            ) : (
                <div>No appointments found.</div>
            )}
        </div>
    );
};

export { AppointmentListView };
