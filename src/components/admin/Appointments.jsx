import { Button, Icon, Modal, ButtonGroup, TextControl, DateTimePicker, Notice, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useSaveAppointment from '../../hooks/use-save-appointment'; // Import the custom hook

// import CalendarApp from "../calandar/calandar";

const Appointments = () => {
    const [isOpen, setOpen] = useState(false);
    const [clientName, setClientName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    // const [appointmentTime, setAppointmentTime] = useState('');
    const [stylist, setStylist] = useState('');

    const { saveAppointment, errorMessage, successMessage, loading } = useSaveAppointment();

    const openModal = () => {
        setOpen(true);
        resetForm(); // Reset form when modal opens
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleSaveAppointment = () => {
        saveAppointment({
            clientName,
            appointmentDate,
            // appointmentTime,
            stylist,
        });
    };

    const resetForm = () => {
        setClientName('');
        setAppointmentDate(new Date());
        // setAppointmentTime('');
        setStylist('');
    };

    return (
        <div>
            {/* Panel at the top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #e2e2e2' }}>
                <Button
                    variant="secondary"
                    onClick={openModal}
                    icon={<Icon icon="plus" />}
                    style={{ marginLeft: 'auto' }}
                >
                    Add Appointment
                </Button>
            </div>

            {/* Calendar component */}
            <div style={{ marginTop: '20px' }}>
                {/* <CalendarApp /> */}
            </div>

            {isOpen && (
                <Modal title="Add a New Appointment" onRequestClose={closeModal}>
                    {errorMessage && <Notice status="error" isDismissible={false}>{errorMessage}</Notice>}
                    {successMessage && <Notice status="success" isDismissible={false}>{successMessage}</Notice>}

                    <TextControl
                        label="Client Name"
                        value={clientName}
                        onChange={(value) => setClientName(value)}
                    />

                    <DateTimePicker
                        currentDate={appointmentDate}
                        onChange={(newDate) => setAppointmentDate(newDate)}
                        is12Hour={true}
                        minDate={new Date()} // Prevent selecting past dates
                    />

                    {/* <TextControl
                        label="Appointment Time"
                        value={appointmentTime}
                        onChange={(value) => setAppointmentTime(value)}
                        placeholder="10:00 AM"
                    /> */}

                    <TextControl
                        label="Stylist"
                        value={stylist}
                        onChange={(value) => setStylist(value)}
                    />

                    <ButtonGroup style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button variant="primary" onClick={handleSaveAppointment} disabled={loading}>
                            {loading ? <Spinner /> : 'Save Appointment'}
                        </Button>
                    </ButtonGroup>
                </Modal>
            )}
        </div>
    );
};

export { Appointments };
